import axios from "axios"
import { __config } from "../config"
import { jwtDecode } from 'jwt-decode'
import { apiHandlers } from "./handler";
const api = axios.create({ baseURL: __config.API_URL + "/api/v1" })


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {

        const response = await apiHandlers.refreshToken();
        if (!response.data.success) {
         throw new Error(response.data.message)
        }
        const { access_token } = response.data.result;
        localStorage.setItem('token', access_token);

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);
export function setAuthorizationHeader(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
export function getTokenFromLocalStorage() {
  return localStorage.getItem("token") || null
}
const user = getTokenFromLocalStorage()
if (user) {
  const { exp } = jwtDecode(user)
  if (exp && Date.now() < exp * 1000) {
    setAuthorizationHeader(user)
  }
  else {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

}

export default api
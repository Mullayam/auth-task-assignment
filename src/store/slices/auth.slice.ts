import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "@/types"
import { getTokenFromLocalStorage } from "@/lib/api/instance"
import { jwtDecode } from "jwt-decode"
let user: IUser | null;
const token = getTokenFromLocalStorage()
const payload: IUser | null = token ? jwtDecode(token) : null

if (!payload) {
    user = null
} else {
    user = payload as IUser
}
type InitialState = {
    user: IUser | null
    token: string | null
    loading: boolean
    error: string | null

}
const initialState: InitialState = {
    user: user || null,
    token: token || null,
    error: null,
    loading: false,

}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
            return state
        },
        setUser: (state, action: PayloadAction<{ user: IUser, token: string }>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            return state
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            return state
        },

        setUserLogout: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")          
            state.user = null
            return state
        },

    },

})
export const { setLoading } = authSlice.actions
export default authSlice.reducer
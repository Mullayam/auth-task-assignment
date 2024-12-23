
import api from './instance';

const adminRoutes = (str: string) => `/admin/${str}`
class ApiHandlers {
    handleLogin = async (data: { email: string, password: string }) => {
        return api.post('/login', { ...data });
    }
    handleLogout = async () => {
        return api.get('/logout');
    }
    handleRegister = async (data: { email: string, password: string, name: string }) => {
        return api.post('/register', { ...data });
    }
    fetchUser = async () => {
        return api.get('/user');
    }
    resetPassword = async (data: { email: string, password: string, confirm_password: string }, token: string) => {
        return api.post('/reset-password?token=' + token, { data, });
    }
    currentUser = async () => {
        return api.get('/current-user');
    }
    verifyEmail = async (token: string) => {
        return api.get('/verify-email?token=' + token);
    }
    sendResetPasswordInstructions = async (data: { email: string }) => {
        return api.post('/send-reset-password-instructions', { ...data });
    }
    // Admin routes
    fetchAllUsers = async (query:string) => {
        return api.get(adminRoutes('get-all-users?' + query));
    }
    searchUser(query: string) {
        return api.get(adminRoutes('search-in-all-usersq=' + query));
    }
    getSingleUser(user_id: string) {
        return api.get(adminRoutes('search-in-all-users/' + user_id));
    }
    updateUser(user_id: string) {
        return api.patch(adminRoutes('update-user/' + user_id));
    }

    deleteUser(user_id: number) {
        return api.delete(adminRoutes('delete-user/' + user_id));
    }


}
export const apiHandlers = new ApiHandlers();
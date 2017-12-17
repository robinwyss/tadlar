import { authConstants } from '../constants'

export const authActions = {
    login,
    logout
}

const login = (credentials) => {
    return {
        type: autConstants.LOGIN,
        credentials
    };
}

const logout = () => {
    return {
        type: autConstants.logout
    };
}
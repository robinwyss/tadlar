import { authConstants } from '../constants';

export function authentication(state = {}, action) {
    switch(action.type) {
        case authConstants.LOGIN:
            return {
                authenticated: true, 
                credentials: action.credentials
            };
        case authConstants.LOGOUT:
            return {
                authenticated: false, 
                credentials: null
            }
        default:
            return state;
    }
}
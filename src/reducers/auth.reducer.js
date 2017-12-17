import { authConstants } from '../constants';

export function authentication(state = {}, action) {
    switch (action.type) {
        case authConstants.LOGIN:
            return Object.assign({}, state, {
                authenticated: true,
                credentials: action.credentials
            });
        case authConstants.LOGOUT:
            return Object.assign({}, state, {
                authenticated: false,
                credentials: null
            });
        default:
            return state;
    }
}
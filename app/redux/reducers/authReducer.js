import {
    POST_LOGIN_RESP
} from '../actions/auth';

const initialState = {
    attempts: 0,
    token: null,
    user: null
};

export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case POST_LOGIN_RESP:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                attempts: state.attempts + 1
            }
        default:
            return state;
    }
};

import {
    SET_ACTION_ERROR_MESSAGE_RESP,
    SET_ACTION_ERROR_RESP,
    SET_ACTION_LOADER_RESP,
    SET_ACTION_SUCCESS_RESP
} from "../actions/RequestHandler";


const initialState = {
    success: false,
    errorMessage: null,
    loader: false,
    error: false
};
const requestHandlerReducer = (state = initialState, action) => {
    switch (action.type) {
        // --------------- Tender reducer -----------------
        case SET_ACTION_ERROR_RESP:
            return {
                ...state,
                error: action.payload
            };
        case SET_ACTION_LOADER_RESP:
            return {
                ...state,
                loader: action.payload
            };
        case SET_ACTION_ERROR_MESSAGE_RESP:
            return {
                ...state,
                errorMessage: action.payload
            };
        case SET_ACTION_SUCCESS_RESP:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
};
export default requestHandlerReducer;

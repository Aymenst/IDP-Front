import {
  GET_TENDERS_RESP,
  GET_TENDER_RESP,
  POST_TENDER_RESP,
  PUT_TENDER_RESP,
  DELETE_TENDER_RESP, SET_ACTION_ERROR_REQ, SET_ACTION_ERROR_RESP,
} from '../actions/tenders.js';

const initialState = {
  tenders: [],
  tender: null,
  isLoading: false,
  error: false
};
const tendersReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Tender reducer -----------------
    case GET_TENDER_RESP:
      return {
        ...state,
        tender: action.payload,
      };
    case GET_TENDERS_RESP:
      return {
        ...state,
        tenders: action.payload,
      };
    case POST_TENDER_RESP:
      return {
        ...state,
        tenders: [...state.tenders, action.payload],
        isLoading: true,
      };
    case PUT_TENDER_RESP:
      return {
        ...state,
        isLoading: true,
        tenders: state.tenders.map(tender => {
          if (tender.id !== action.payload.id) {
            return tender;
          }
          return { ...action.payload };
        })
      };
    case DELETE_TENDER_RESP:
      return {
        ...state,
        tenders: state.tenders.filter(tender => !action.payload.includes(tender.id))
      };
    case SET_ACTION_ERROR_RESP:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
export default tendersReducer;

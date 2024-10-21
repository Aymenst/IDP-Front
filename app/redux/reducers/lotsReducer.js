import {
  GET_LOT_RESP,
  GET_LOTS_RESP,
  POST_LOT_RESP,
  PUT_LOT_RESP,
  DELETE_LOT_RESP, GET_LOTS_BY_TENDER_RESP, PUT_CRITERIA_CHECKLIST_RESP, PUT_SOLVENCY_CHECKLIST_RESP
} from '../actions/lots.js';
import {PUT_CRITERIA_EVALUATION_RESP, PUT_SOLVENCY_EVALUATION_RESP} from "../actions/bidders";

const initialState = {
  lots: [],
  lot: null
};
const lotsReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- CHECKLIST ----------------
    case PUT_SOLVENCY_CHECKLIST_RESP:
      return {
        ...state,
        lot: action.payload
      };
    case PUT_CRITERIA_CHECKLIST_RESP:
      return {
        ...state,
        lot: action.payload
      };
      // --------------- Evaluation ----------------
    case PUT_SOLVENCY_EVALUATION_RESP:
      return {
        ...state,
        lot: action.payload
      };
    case PUT_CRITERIA_EVALUATION_RESP:
      return {
        ...state,
        lot: action.payload
      };
      // --------------- Lot reducer -----------------
    case GET_LOT_RESP:
      return {
        ...state,
        lot: action.payload
      };
    case GET_LOTS_BY_TENDER_RESP:
      return {
        ...state,
        lots: action.payload
      };
    case GET_LOTS_RESP:
      return {
        ...state,
        lots: action.payload
      };
    case POST_LOT_RESP:
      return {
        ...state,
        lots: [...state.lots, action.payload]
      };
    case PUT_LOT_RESP:
      return {
        ...state,
        lots: state.lots.map(lot => {
          if (lot.id !== action.payload.id) {
            return lot;
          }
          return action.payload;
        })
      };
    case DELETE_LOT_RESP:
      return {
        ...state,
        lots: state.lots.filter(lot => action.payload.indexOf(lot.id) < 0)
      };
    default:
      return state;
  }
};
export default lotsReducer;

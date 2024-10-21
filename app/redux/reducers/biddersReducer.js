import {
  DELETE_BIDDER_RESP,
  GET_BIDDER_RESP,
  GET_BIDDERS_RESP,
  POST_BIDDER_RESP,
  PUT_BIDDER_RESP,
  PUT_CRITERIA_EVALUATION_RESP,
  PUT_SOLVENCY_EVALUATION_RESP
} from '../actions/bidders.js';


const initialState = {
  bidders: [],
  bidder: null,
};

const biddersReducer = (state = initialState, action) => {
  switch (action.type) {

      // --------------- Winner reducer -----------------
    case GET_BIDDER_RESP:
      return {
        ...state,
        bidder: action.payload,
      };
    case GET_BIDDERS_RESP:
      return {
        ...state,
        bidders: action.payload
      };
    case POST_BIDDER_RESP:
      return {
        ...state,
        bidders: [...state.bidders, action.payload]
      };
    case PUT_BIDDER_RESP:
      return {
        ...state,
        bidders: state.bidders.map(bidder => {
          if (bidder.id !== action.payload.id) {
            return bidder;
          }
          return { ...action.payload };
        })
      };
    case DELETE_BIDDER_RESP:
      return {
        ...state,
        bidders: state.bidders.filter(bidder => action.payload.indexOf(bidder.id) < 0)
      };
    default:
      return state;
  }
};

export default biddersReducer;

import {
  DELETE_WINNER_RESP,
  GET_WINNER_RESP,
  GET_WINNERS_RESP,
  POST_WINNER_RESP,
  PUT_WINNER_RESP
} from '../actions/winners';


const initialState = {
  winners: [],
  winner: null,
};

const winnersReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Winner reducer -----------------
    case GET_WINNER_RESP:
      return {
        ...state,
        winner: action.payload,
      };
    case GET_WINNERS_RESP:
      return {
        ...state,
        winners: action.payload
      };
    case POST_WINNER_RESP:
      return {
        ...state,
        winners: [...state.winners, action.payload]
      };
    case PUT_WINNER_RESP:
      return {
        ...state,
        winners: state.winners.map(winner => {
          if (winner.id !== action.payload.id) {
            return winner;
          }
          return { ...action.payload };
        })
      };
    case DELETE_WINNER_RESP:
      return {
        ...state,
        winners: state.winners.filter(winner => action.payload.indexOf(winner.id) < 0)
      };
    default:
      return state;
  }
};

export default winnersReducer;

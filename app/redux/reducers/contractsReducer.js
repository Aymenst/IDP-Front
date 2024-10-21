import {
  DELETE_CONTRACT_RESP,
  GET_CONTRACT_RESP,
  GET_CONTRACTS_RESP,
  POST_CONTRACT_RESP,
  PUT_CONTRACT_RESP
} from '../actions/contracts';

const initialState = {
  contracts: [],
  contract: null
};
const contractsReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Client reducer -----------------
    case GET_CONTRACT_RESP:
      return {
        ...state,
        contract: action.payload
      };
    case GET_CONTRACTS_RESP:
      return {
        ...state,
        contracts: action.payload
      };
    case POST_CONTRACT_RESP:
      return {
        ...state,
        contracts: [...state.contracts, action.payload]
      };
    case PUT_CONTRACT_RESP:
      return {
        ...state,
        contracts: state.contracts.map(client => {
          if (client.id !== action.payload.id) {
            return client;
          }
          return action.payload;
        })
      };
    case DELETE_CONTRACT_RESP:
      return {
        ...state,
        contracts: state.contracts.filter(client => action.payload.indexOf(client.id) < 0)
      };
    default:
      return state;
  }
};
export default contractsReducer;

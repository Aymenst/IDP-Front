import {
  DELETE_CLIENT_RESP,
  GET_CLIENT_RESP,
  GET_CLIENTS_RESP,
  POST_CLIENT_RESP,
  PUT_CLIENT_RESP
} from '../actions/clients';

const initialState = {
  clients: [],
  client: null
};
const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Client reducer -----------------
    case GET_CLIENT_RESP:
      return {
        ...state,
        client: action.payload
      };
    case GET_CLIENTS_RESP:
      return {
        ...state,
        clients: action.payload
      };
    case POST_CLIENT_RESP:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case PUT_CLIENT_RESP:
      return {
        ...state,
        clients: state.clients.map(client => {
          if (client.id !== action.payload.id) {
            return client;
          }
          return action.payload;
        })
      };
    case DELETE_CLIENT_RESP:
      return {
        ...state,
        clients: state.clients.filter(client => action.payload.indexOf(client.id) < 0)
      };
    default:
      return state;
  }
};
export default clientsReducer;

import {
  DELETE_CONTACT_RESP,
  GET_CONTACT_RESP,
  GET_CONTACTS_RESP,
  POST_CONTACT_RESP,
  PUT_CONTACT_RESP
} from '../actions/contacts';

const initialState = {
  contacts: [],
  contact: null
};
const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Client reducer -----------------
    case GET_CONTACT_RESP:
      return {
        ...state,
        contact: action.payload
      };
    case GET_CONTACTS_RESP:
      return {
        ...state,
        contacts: action.payload
      };
    case POST_CONTACT_RESP:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case PUT_CONTACT_RESP:
      return {
        ...state,
        contacts: state.contacts.map(client => {
          if (client.id !== action.payload.id) {
            return client;
          }
          return action.payload;
        })
      };
    case DELETE_CONTACT_RESP:
      return {
        ...state,
        contacts: state.contacts.filter(client => action.payload.indexOf(client.id) < 0)
      };
    default:
      return state;
  }
};
export default contactsReducer;

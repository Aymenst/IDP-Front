import {
  DELETE_CHECKLIST_RESP,
  GET_CHECKLIST_RESP,
  GET_CHECKLISTS_RESP,
  POST_CHECKLIST_RESP,
  PUT_CHECKLIST_RESP
} from '../actions/checklists';

const initialState = {
  checklists: [],
  checklist: null
};
const checklistsReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Client reducer -----------------
    case GET_CHECKLIST_RESP:
      return {
        ...state,
        checklist: action.payload
      };
    case GET_CHECKLISTS_RESP:
      return {
        ...state,
        checklists: action.payload
      };
    case POST_CHECKLIST_RESP:
      return {
        ...state,
        checklists: [...state.checklists, action.payload]
      };
    case PUT_CHECKLIST_RESP:
      return {
        ...state,
        checklists: state.checklists.map(checklist => {
          if (checklist.id !== action.payload.id) {
            return checklist;
          }
          return action.payload;
        })
      };
    case DELETE_CHECKLIST_RESP:
      return {
        ...state,
        checklists: state.checklists.filter(checklist => action.payload.indexOf(checklist.id) < 0)
      };
    default:
      return state;
  }
};
export default checklistsReducer;

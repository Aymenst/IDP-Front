import {
  DELETE_CPV_CODE_RESP,
  GET_CPV_CODE_RESP,
  GET_CPV_CODES_RESP,
  POST_CPV_CODE_RESP,
  PUT_CPV_CODE_RESP, UPLOAD_CPV_CODES_RESP
} from '../actions/CpvCode';


const initialState = {
  cpvCodes: [],
  cpvCode: null,
};
const CpvCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------- Cpv Code reducer -----------------
    case GET_CPV_CODE_RESP:
      return {
        ...state,
        cpvCode: action.payload,
      };
    case GET_CPV_CODES_RESP:
      return {
        ...state,
        cpvCodes: action.payload,
      };
    case POST_CPV_CODE_RESP:
      return {
        ...state,
        cpvCodes: [...state.cpvCodes, action.payload],
      };
    case UPLOAD_CPV_CODES_RESP:
      return {
        ...state,
        cpvCodes: action.payload,
      };
    case PUT_CPV_CODE_RESP:
      return {
        ...state,
        cpvCodes: state.cpvCodes.map(cpvCode => {
          if (cpvCode.code !== action.payload.code) {
            return cpvCode;
          }
          return { ...action.payload };
        })
      };
    case DELETE_CPV_CODE_RESP:
      return {
        ...state,
        cpvCodes: state.cpvCodes.filter(cpvCode => !action.payload.includes(cpvCode.code))
      };
    default:
      return state;
  }
};
export default CpvCodeReducer;

export const GET_CPV_CODE_REQ = 'GET_CPV_CODE_REQ';
export const GET_CPV_CODES_REQ = 'GET_CPV_CODES_REQ';
export const POST_CPV_CODE_REQ = 'POST_CPV_CODE_REQ';
export const PUT_CPV_CODE_REQ = 'PUT_CPV_CODE_REQ';
export const DELETE_CPV_CODE_REQ = 'DELETE_CPV_CODE_REQ';
export const UPLOAD_CPV_CODES_REQ = 'UPLOAD_CPV_CODES_REQ';

export const GET_CPV_CODE_RESP = 'GET_CPV_CODE_RESP';
export const GET_CPV_CODES_RESP = 'GET_CPV_CODES_RESP';
export const POST_CPV_CODE_RESP = 'POST_CPV_CODE_RESP';
export const PUT_CPV_CODE_RESP = 'PUT_CPV_CODE_RESP';
export const DELETE_CPV_CODE_RESP = 'DELETE_CPV_CODE_RESP';
export const UPLOAD_CPV_CODES_RESP = 'UPLOAD_CPV_CODES_RESP';


// --------------- CPV Code Actions -----------------
export const getCpvCode = (id) => ({
  type: GET_CPV_CODE_REQ,
  payload: id,
});

export const getCpvCodeResp = (cpvCodes) => ({
  type: GET_CPV_CODE_RESP,
  payload: cpvCodes,
});

export const getCpvCodes = () => ({
  type: GET_CPV_CODES_REQ,
});

export const getCpvCodesResp = (cpvCodes) => ({
  type: GET_CPV_CODES_RESP,
  payload: cpvCodes,
});
export const postCpvCode = (cpvCode) => ({
  type: POST_CPV_CODE_REQ,
  payload: cpvCode
});

export const postCpvCodeResp = (cpvCode) => ({
  type: POST_CPV_CODE_RESP,
  payload: cpvCode
});

export const uploadCpvCodes = (delimiter, file) => ({
  type: UPLOAD_CPV_CODES_REQ,
  payload: { delimiter, file }
});

export const uploadCpvCodesResp = (cpvCode) => ({
  type: UPLOAD_CPV_CODES_RESP,
  payload: cpvCode
});

export const putCpvCode = cpvCode => ({
  type: PUT_CPV_CODE_REQ,
  payload: cpvCode
});
export const putCpvCodeResp = cpvCode => ({
  type: PUT_CPV_CODE_RESP,
  payload: cpvCode
});

export const deleteCpvCodes = cpvCodeIds => ({
  type: DELETE_CPV_CODE_REQ,
  payload: cpvCodeIds
});
export const deleteCpvCodeResp = cpvCodes => ({
  type: DELETE_CPV_CODE_RESP,
  payload: cpvCodes
});

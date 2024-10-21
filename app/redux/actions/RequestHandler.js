export const SET_ACTION_ERROR_RESP = 'SET_ACTION_ERROR_RESP';
export const SET_ACTION_ERROR_REQ = 'SET_ACTION_ERROR_REQ';

export const SET_ACTION_ERROR_MESSAGE_RESP = 'SET_ACTION_ERROR_MESSAGE_RESP';
export const SET_ACTION_ERROR_MESSAGE_REQ = 'SET_ACTION_ERROR_MESSAGE_REQ';

export const SET_ACTION_LOADER_RESP = 'SET_ACTION_LOADER_RESP';
export const SET_ACTION_LOADER_REQ = 'SET_ACTION_LOADER_REQ';

export const SET_ACTION_SUCCESS_RESP = 'SET_ACTION_SUCCESS_RESP';
export const SET_ACTION_SUCCESS_REQ = 'SET_ACTION_SUCCESS_REQ';


export const setErrorReq = (error) => ({
  type: SET_ACTION_ERROR_REQ,
  payload: error
});

export const setErrorResp = error => ({
  type: SET_ACTION_ERROR_RESP,
  payload: error
});

export const setErrorMessageReq = (error) => ({
  type: SET_ACTION_ERROR_MESSAGE_REQ,
  payload: error
});

export const setErrorMessageResp = error => ({
  type: SET_ACTION_ERROR_MESSAGE_RESP,
  payload: error
});


export const setLoaderReq = (error) => ({
  type: SET_ACTION_LOADER_REQ,
  payload: error
});

export const setLoaderResp = error => ({
  type: SET_ACTION_LOADER_RESP,
  payload: error
});

export const setSuccessReq = (error) => ({
  type: SET_ACTION_SUCCESS_REQ,
  payload: error
});

export const setSuccessResp = error => ({
  type: SET_ACTION_SUCCESS_RESP,
  payload: error
});

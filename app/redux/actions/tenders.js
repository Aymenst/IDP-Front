export const GET_TENDER_REQ = 'GET_TENDER_REQ';
export const GET_TENDERS_REQ = 'GET_TENDERS_REQ';
export const POST_TENDER_REQ = 'POST_TENDER_REQ';
export const PUT_TENDER_REQ = 'PUT_TENDER_REQ';
export const DELETE_TENDER_REQ = 'DELETE_TENDER_REQ';

export const GET_TENDER_RESP = 'GET_TENDER_RESP';
export const GET_TENDERS_RESP = 'GET_TENDERS_RESP';
export const POST_TENDER_RESP = 'POST_TENDER_RESP';
export const PUT_TENDER_RESP = 'PUT_TENDER_RESP';
export const DELETE_TENDER_RESP = 'DELETE_TENDER_RESP';

export const SET_ACTION_ERROR_RESP = "SET_ACTION_ERROR_RESP"
export const SET_ACTION_ERROR_REQ = "SET_ACTION_ERROR_REQ"
// --------------- Tender Actions -----------------
export const getTender = (id) => ({
  type: GET_TENDER_REQ,
  payload: id,
});

export const getTenderResp = (tender) => ({
  type: GET_TENDER_RESP,
  payload: tender,
});

export const getTenders = () => ({
  type: GET_TENDERS_REQ,
});

export const getTendersResp = (tenders) => ({
  type: GET_TENDERS_RESP,
  payload: tenders,
});
export const postTender = (tender) => ({
  type: POST_TENDER_REQ,
  payload: tender
});

export const postTenderResp = (tender) => ({
  type: POST_TENDER_RESP,
  payload: tender
});

export const putTender = tender => ({
  type: PUT_TENDER_REQ,
  payload: tender
});
export const putTenderResp = tender => ({
  type: PUT_TENDER_RESP,
  payload: tender
});

export const deleteTenders = tenderIds => ({
  type: DELETE_TENDER_REQ,
  payload: tenderIds
});
export const deleteTenderResp = tenderIds => ({
  type: DELETE_TENDER_RESP,
  payload: tenderIds
});

export const setErrorReq = (error) => ({
  type: SET_ACTION_ERROR_REQ,
  payload: error
});

export const setErrorResp = error => ({
  type: SET_ACTION_ERROR_RESP,
  payload: error
});

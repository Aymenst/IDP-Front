export const GET_LOT_REQ = 'GET_LOT_REQ';
export const GET_LOTS_BY_TENDER_REQ = 'GET_LOTS_BY_TENDER_REQ';
export const GET_LOTS_REQ = 'GET_LOTS_REQ';
export const POST_LOT_REQ = 'POST_LOT_REQ';
export const PUT_LOT_REQ = 'PUT_LOT_REQ';
export const DELETE_LOT_REQ = 'DELETE_LOT_REQ';

export const GET_LOT_RESP = 'GET_LOT_RESP';
export const GET_LOTS_BY_TENDER_RESP = 'GET_LOTS_BY_TENDER_RESP';
export const GET_LOTS_RESP = 'GET_LOTS_RESP';
export const POST_LOT_RESP = 'POST_LOT_RESP';
export const PUT_LOT_RESP = 'PUT_LOT_RESP';
export const DELETE_LOT_RESP = 'DELETE_LOT_RESP';

export const PUT_SOLVENCY_CHECKLIST_REQ = 'PUT_SOLVENCY_CHECKLIST_REQ';
export const PUT_SOLVENCY_CHECKLIST_RESP = 'PUT_SOLVENCY_CHECKLIST_RESP';
export const PUT_CRITERIA_CHECKLIST_REQ = 'PUT_CRITERIA_CHECKLIST_REQ';
export const PUT_CRITERIA_CHECKLIST_RESP = 'PUT_CRITERIA_CHECKLIST_RESP';
// --------------- SOLVENCY CHECKLIST ----------
export const putSolvencyChecklist = (id, data) => ({
  type: PUT_SOLVENCY_CHECKLIST_REQ,
  payload: { id, payload: data }
});

export const putSolvencyChecklistResp = (lot) => ({
  type: PUT_SOLVENCY_CHECKLIST_RESP,
  payload: lot
});
// --------------- CRITERIA CHECKLIST ----------
export const putCriteriaChecklist = (id, data) => ({
  type: PUT_CRITERIA_CHECKLIST_REQ,
  payload: { id, payload: data }
});

export const putCriteriaChecklistResp = (lot) => ({
  type: PUT_CRITERIA_CHECKLIST_RESP,
  payload: lot
});


// --------------- Lot Actions -----------------

export const getLot = (id) => ({
  type: GET_LOT_REQ,
  payload: id,
});

export const getLotResp = (lot) => ({
  type: GET_LOT_RESP,
  payload: lot,
});
export const getLotsByTenderId = (id) => ({
  type: GET_LOTS_BY_TENDER_REQ,
  payload: id,
});

export const getLotsByTenderIdResp = (lots) => ({
  type: GET_LOTS_BY_TENDER_RESP,
  payload: lots,
});

export const getLots = () => ({
  type: GET_LOTS_REQ,
});

export const getLotsResp = (lots) => ({
  type: GET_LOTS_RESP,
  payload: lots,
});
export const postLot = (lot) => ({
  type: POST_LOT_REQ,
  payload: lot
});

export const postLotResp = (lot) => ({
  type: POST_LOT_RESP,
  payload: lot
});

export const putLot = lot => ({
  type: PUT_LOT_REQ,
  payload: lot
});
export const putLotResp = lot => ({
  type: PUT_LOT_RESP,
  payload: lot
});

export const deleteLots = lotIds => ({
  type: DELETE_LOT_REQ,
  payload: lotIds
});
export const deleteLotResp = lotIds => ({
  type: DELETE_LOT_RESP,
  payload: lotIds
});

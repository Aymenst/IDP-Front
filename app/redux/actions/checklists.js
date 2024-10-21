export const GET_CHECKLIST_REQ = 'GET_CHECKLIST_REQ';
export const GET_CHECKLISTS_REQ = 'GET_CHECKLISTS_REQ';
export const POST_CHECKLIST_REQ = 'POST_CHECKLIST_REQ';
export const PUT_CHECKLIST_REQ = 'PUT_CHECKLIST_REQ';
export const DELETE_CHECKLIST_REQ = 'DELETE_CHECKLIST_REQ';

export const GET_CHECKLIST_RESP = 'GET_CHECKLIST_RESP';
export const GET_CHECKLISTS_RESP = 'GET_CHECKLISTS_RESP';
export const POST_CHECKLIST_RESP = 'POST_CHECKLIST_RESP';
export const PUT_CHECKLIST_RESP = 'PUT_CHECKLIST_RESP';
export const DELETE_CHECKLIST_RESP = 'DELETE_CHECKLIST_RESP';

// --------------- Checklist Actions -----------------
export const getChecklist = payload => ({
  type: GET_CHECKLIST_REQ,
  payload
});
export const getChecklistResp = payload => ({
  type: GET_CHECKLIST_RESP,
  payload
});

export const getChecklists = payload => ({
  type: GET_CHECKLISTS_REQ,
  payload
});
export const getChecklistsResp = payload => ({
  type: GET_CHECKLISTS_RESP,
  payload
});

export const postChecklist = payload => ({
  type: POST_CHECKLIST_REQ,
  payload
});
export const postChecklistResp = payload => ({
  type: POST_CHECKLIST_RESP,
  payload
});

export const putChecklist = (id, payload) => ({
  type: PUT_CHECKLIST_REQ,
  payload: { payload, id }
});
export const putChecklistResp = payload => ({
  type: PUT_CHECKLIST_RESP,
  payload
});

export const deleteChecklists = payload => ({
  type: DELETE_CHECKLIST_REQ,
  payload
});
export const deleteChecklistsResp = payload => ({
  type: DELETE_CHECKLIST_RESP,
  payload
});
// ----------------------------------------------

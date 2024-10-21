export const GET_CONTACT_REQ = 'GET_CONTACT_REQ';
export const GET_CONTACTS_REQ = 'GET_CONTACTS_REQ';
export const POST_CONTACT_REQ = 'POST_CONTACT_REQ';
export const PUT_CONTACT_REQ = 'PUT_CONTACT_REQ';
export const DELETE_CONTACT_REQ = 'DELETE_CONTACT_REQ';

export const GET_CONTACT_RESP = 'GET_CONTACT_RESP';
export const GET_CONTACTS_RESP = 'GET_CONTACTS_RESP';
export const POST_CONTACT_RESP = 'POST_CONTACT_RESP';
export const PUT_CONTACT_RESP = 'PUT_CONTACT_RESP';
export const DELETE_CONTACT_RESP = 'DELETE_CONTACT_RESP';

// --------------- Contact Actions -----------------
export const getContact = payload => ({
  type: GET_CONTACT_REQ,
  payload
});
export const getContactResp = payload => ({
  type: GET_CONTACT_RESP,
  payload
});

export const getContacts = payload => ({
  type: GET_CONTACTS_REQ,
  payload
});
export const getContactsResp = payload => ({
  type: GET_CONTACTS_RESP,
  payload
});

export const postContact = payload => ({
  type: POST_CONTACT_REQ,
  payload
});
export const postContactResp = payload => ({
  type: POST_CONTACT_RESP,
  payload
});

export const putContact = (id, payload) => ({
  type: PUT_CONTACT_REQ,
  payload: { payload, id }
});
export const putContactResp = payload => ({
  type: PUT_CONTACT_RESP,
  payload
});

export const deleteContacts = payload => ({
  type: DELETE_CONTACT_REQ,
  payload
});
export const deleteContactsResp = payload => ({
  type: DELETE_CONTACT_RESP,
  payload
});
// ----------------------------------------------

export const GET_CLIENT_REQ = 'GET_CLIENT_REQ';
export const GET_CLIENTS_REQ = 'GET_CLIENTS_REQ';
export const POST_CLIENT_REQ = 'POST_CLIENT_REQ';
export const PUT_CLIENT_REQ = 'PUT_CLIENT_REQ';
export const DELETE_CLIENT_REQ = 'DELETE_CLIENT_REQ';

export const GET_CLIENT_RESP = 'GET_CLIENT_RESP';
export const GET_CLIENTS_RESP = 'GET_CLIENTS_RESP';
export const POST_CLIENT_RESP = 'POST_CLIENT_RESP';
export const PUT_CLIENT_RESP = 'PUT_CLIENT_RESP';
export const DELETE_CLIENT_RESP = 'DELETE_CLIENT_RESP';

// --------------- Client Actions -----------------
export const getClient = payload => ({
  type: GET_CLIENT_REQ,
  payload
});
export const getClientResp = payload => ({
  type: GET_CLIENT_RESP,
  payload
});

export const getClients = payload => ({
  type: GET_CLIENTS_REQ,
  payload
});
export const getClientsResp = payload => ({
  type: GET_CLIENTS_RESP,
  payload
});

export const postClient = payload => ({
  type: POST_CLIENT_REQ,
  payload
});
export const postClientResp = payload => ({
  type: POST_CLIENT_RESP,
  payload
});

export const putClient = (id, payload) => ({
  type: PUT_CLIENT_REQ,
  payload: { payload, id }
});
export const putClientResp = payload => ({
  type: PUT_CLIENT_RESP,
  payload
});

export const deleteClients = payload => ({
  type: DELETE_CLIENT_REQ,
  payload
});
export const deleteClientsResp = payload => ({
  type: DELETE_CLIENT_RESP,
  payload
});
// ----------------------------------------------

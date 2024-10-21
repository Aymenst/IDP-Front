export const GET_CONTRACT_REQ = 'GET_CONTRACT_REQ';
export const GET_CONTRACTS_REQ = 'GET_CONTRACTS_REQ';
export const POST_CONTRACT_REQ = 'POST_CONTRACT_REQ';
export const PUT_CONTRACT_REQ = 'PUT_CONTRACT_REQ';
export const DELETE_CONTRACT_REQ = 'DELETE_CONTRACT_REQ';

export const GET_CONTRACT_RESP = 'GET_CONTRACT_RESP';
export const GET_CONTRACTS_RESP = 'GET_CONTRACTS_RESP';
export const POST_CONTRACT_RESP = 'POST_CONTRACT_RESP';
export const PUT_CONTRACT_RESP = 'PUT_CONTRACT_RESP';
export const DELETE_CONTRACT_RESP = 'DELETE_CONTRACT_RESP';

// --------------- Contract Actions -----------------
export const getContract = payload => ({
  type: GET_CONTRACT_REQ,
  payload
});
export const getContractResp = payload => ({
  type: GET_CONTRACT_RESP,
  payload
});

export const getContracts = payload => ({
  type: GET_CONTRACTS_REQ,
  payload
});
export const getContractsResp = payload => ({
  type: GET_CONTRACTS_RESP,
  payload
});

export const postContract = payload => ({
  type: POST_CONTRACT_REQ,
  payload
});
export const postContractResp = payload => ({
  type: POST_CONTRACT_RESP,
  payload
});

export const putContract = (id, payload) => ({
  type: PUT_CONTRACT_REQ,
  payload: { payload, id }
});
export const putContractResp = payload => ({
  type: PUT_CONTRACT_RESP,
  payload
});

export const deleteContracts = payload => ({
  type: DELETE_CONTRACT_REQ,
  payload
});
export const deleteContractsResp = payload => ({
  type: DELETE_CONTRACT_RESP,
  payload
});
// ----------------------------------------------

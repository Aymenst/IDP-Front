export const GET_BIDDER_REQ = 'GET_BIDDER_REQ';
export const GET_BIDDERS_REQ = 'GET_BIDDERS_REQ';
export const POST_BIDDER_REQ = 'POST_BIDDER_REQ';
export const PUT_BIDDER_REQ = 'PUT_BIDDER_REQ';
export const DELETE_BIDDER_REQ = 'DELETE_BIDDER_REQ';

export const GET_BIDDER_RESP = 'GET_BIDDER_RESP';
export const GET_BIDDERS_RESP = 'GET_BIDDERS_RESP';
export const POST_BIDDER_RESP = 'POST_BIDDER_RESP';
export const PUT_BIDDER_RESP = 'PUT_BIDDER_RESP';
export const DELETE_BIDDER_RESP = 'DELETE_BIDDER_RESP';

export const PUT_CRITERIA_EVALUATION_REQ = 'PUT_CRITERIA_EVALUATION_REQ';
export const PUT_CRITERIA_EVALUATION_RESP = 'PUT_CRITERIA_EVALUATION_RESP';

export const PUT_SOLVENCY_EVALUATION_REQ = 'PUT_SOLVENCY_EVALUATION_REQ';
export const PUT_SOLVENCY_EVALUATION_RESP = 'PUT_SOLVENCY_EVALUATION_RESP';

// --------------- SOLVENCY EVALUATION ----------
export const putSolvencyEvaluation = (id, data) => ({
  type: PUT_SOLVENCY_EVALUATION_REQ,
  payload: { id, payload: data }
});

export const putSolvencyEvaluationResp = (lot) => ({
  type: PUT_SOLVENCY_EVALUATION_RESP,
  payload: lot
});
// --------------- CRITERIA EVALUATION ----------
export const putCriteriaEvaluation = (id, data) => ({
  type: PUT_CRITERIA_EVALUATION_REQ,
  payload: { id, payload: data }
});

export const putCriteriaEvaluationResp = (lot) => ({
  type: PUT_CRITERIA_EVALUATION_RESP,
  payload: lot
});


// --------------- Bidder Actions -----------------
export const getBidder = (id) => ({
  type: GET_BIDDER_REQ,
  payload: id,
});

export const getBidderResp = (bidder) => ({
  type: GET_BIDDER_RESP,
  payload: bidder,
});

export const getBidders = (tenderId, lotId) => ({
  type: GET_BIDDERS_REQ,
  payload: { tenderId, lotId }
});

export const getBiddersResp = (bidders) => ({
  type: GET_BIDDERS_RESP,
  payload: bidders,
});
export const postBidder = (bidder, files) => ({
  type: POST_BIDDER_REQ,
  payload: { bidder, files }
});

export const postBidderResp = (bidder) => ({
  type: POST_BIDDER_RESP,
  payload: bidder
});

export const putBidder = (bidder, files) => ({
  type: PUT_BIDDER_REQ,
  payload: { bidder, files }
});
export const putBidderResp = bidder => ({
  type: PUT_BIDDER_RESP,
  payload: bidder
});

export const deleteBidders = bidderIds => ({
  type: DELETE_BIDDER_REQ,
  payload: bidderIds
});
export const deleteBidderResp = bidderIds => ({
  type: DELETE_BIDDER_RESP,
  payload: bidderIds
});

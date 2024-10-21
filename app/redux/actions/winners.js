export const GET_WINNER_REQ = 'GET_WINNER_REQ';
export const GET_WINNERS_REQ = 'GET_WINNERS_REQ';
export const POST_WINNER_REQ = 'POST_WINNER_REQ';
export const PUT_WINNER_REQ = 'PUT_WINNER_REQ';
export const DELETE_WINNER_REQ = 'DELETE_WINNER_REQ';

export const GET_WINNER_RESP = 'GET_WINNER_RESP';
export const GET_WINNERS_RESP = 'GET_WINNERS_RESP';
export const POST_WINNER_RESP = 'POST_WINNER_RESP';
export const PUT_WINNER_RESP = 'PUT_WINNER_RESP';
export const DELETE_WINNER_RESP = 'DELETE_WINNER_RESP';

// --------------- Winner Actions -----------------
export const getWinner = (id) => ({
  type: GET_WINNER_REQ,
  payload: id,
});

export const getWinnerResp = (winner) => ({
  type: GET_WINNER_RESP,
  payload: winner,
});

export const getWinners = (tenderId, lotId) => ({
  type: GET_WINNERS_REQ,
  payload: { tenderId, lotId }
});

export const getWinnersResp = (winners) => ({
  type: GET_WINNERS_RESP,
  payload: winners,
});
export const postWinner = (id, data) => ({
  type: POST_WINNER_REQ,
  payload: { id, payload: data }
});

export const postWinnerResp = (winner) => ({
  type: POST_WINNER_RESP,
  payload: winner
});

export const putWinner = winner => ({
  type: PUT_WINNER_REQ,
  payload: winner
});
export const putWinnerResp = winner => ({
  type: PUT_WINNER_RESP,
  payload: winner
});

export const deleteWinners = winnerIds => ({
  type: DELETE_WINNER_REQ,
  payload: winnerIds
});
export const deleteWinnerResp = winnerIds => ({
  type: DELETE_WINNER_RESP,
  payload: winnerIds
});

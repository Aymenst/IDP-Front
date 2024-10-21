// POST_LOGIN_REQ, postLoginResp
export const POST_LOGIN_REQ = 'POST_LOGIN_REQ';

export const POST_LOGIN_RESP = 'POST_LOGIN_RESP';

// --------------- Client Actions -----------------
export const postLogin = payload => ({
    type: POST_LOGIN_REQ,
    payload
});
export const postLoginResp = payload => ({
    type: POST_LOGIN_RESP,
    payload
});
// ----------------------------------------------

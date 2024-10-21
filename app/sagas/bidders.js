import axios from 'axios';
import {
    all, call, put, takeLatest
} from 'redux-saga/effects';
import {API_URL} from '../redux/constants/api';
import {
    DELETE_BIDDER_REQ,
    deleteBidderResp, GET_BIDDER_REQ, GET_BIDDERS_REQ,
    getBidderResp,
    getBiddersResp, POST_BIDDER_REQ,
    postBidderResp, PUT_BIDDER_REQ, PUT_CRITERIA_EVALUATION_REQ, PUT_SOLVENCY_EVALUATION_REQ,
    putBidderResp,
    putCriteriaEvaluationResp, putSolvencyEvaluationResp
} from '../redux/actions/bidders';
import {setErrorMessageResp, setErrorResp, setSuccessResp} from "../redux/actions/RequestHandler";
import {API} from "../config/apiUrl";


function requestGetBidder({id}) {
    return axios.request({
        method: 'get',
        url: `${API}/bidders/${id}`,
    });
}

function requestGetBidders({tenderId, lotId}) {
    return axios.request({
        method: 'get',
        url: `${API}/bidders`,
        params: {
            tenderId,
            lotId
        }
    });
}

function requestPostBidder({bidder, files}) {
    const req_bidder = JSON.stringify(bidder);
    const blob = new Blob([req_bidder], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append('bidder', blob);
    for (let i = 0; i < files.length; i++) {
        data.append('files', files[i]);
    }
    return axios.request({
        method: 'post',
        url: `${API}/bidders`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

function requestPutBidder({bidder, files}) {
    const req_bidder = JSON.stringify(bidder);
    const blob = new Blob([req_bidder], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append('bidder', blob);
    for (let i = 0; i < files.length; i++) {
        data.append('files', files[i]);
    }
    console.log(data)
    return axios.request({
        method: 'put',
        url: `${API}/bidders`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

function requestDeleteBidder(payload) {
    return axios.request({
        method: 'delete',
        url: `${API}/bidders`,
        data: payload
    });
}


function* handleGetBidder(action) {
    try {
        // yield put(setLoading(true));
        const response = yield call(requestGetBidder, action.payload);
        const {data} = response;
        yield put(getBidderResp(data));
    } catch (error) {
        console.log(error);
    }
    // yield put(setLoading(false));
}

function* handleGetBidders(action) {
    try {
        // yield put(setLoading(true));
        const response = yield call(requestGetBidders, action.payload);
        const {data} = response;
        yield put(getBiddersResp(data));
    } catch (error) {
        console.log(error);
    }
    // yield put(setLoading(false));
}

function* handlePostBidder(action) {
    try {
        yield put(setErrorMessageResp(null));// for error messages
        yield put(setErrorResp(false)); // error popup
        // yield put(setLoading(true));
        const response = yield call(requestPostBidder, action.payload);
        const {data} = response;
        console.log(data)
        yield put(postBidderResp(data));
        yield put(setSuccessResp(true));
    } catch (error) {
        const {response} = error;
        yield put(setErrorResp(true));
        yield put(setErrorMessageResp(response.data));
        console.log(response);
    }
    // yield put(setLoading(false));
}

function* handlePutBidder(action) {
    try {
        yield put(setErrorMessageResp(null));// for error messages
        yield put(setErrorResp(false)); // error popup
        // yield put(setLoading(true));
        const response = yield call(requestPutBidder, action.payload);
        const {data} = response;
        yield put(putBidderResp(data));
        yield put(setSuccessResp(true));
    } catch (error) {
        const {response} = error;
        yield put(setErrorResp(true));
        yield put(setErrorMessageResp(response.data));
    }
    // yield put(setLoading(false));
}

function* handleDeleteBidder(action) {
    try {
        // yield put(setLoading(true));
        yield call(requestDeleteBidder, action.payload);
        yield put(deleteBidderResp(action.payload));
    } catch (error) {
        console.log(error);
    }
    // yield put(setLoading(false));
}


function* watchGetBidder() {
    yield takeLatest(GET_BIDDER_REQ, handleGetBidder);
}

function* watchGetBidders() {
    yield takeLatest(GET_BIDDERS_REQ, handleGetBidders);
}

function* watchPostBidder() {
    yield takeLatest(POST_BIDDER_REQ, handlePostBidder);
}

function* watchPutBidder() {
    yield takeLatest(PUT_BIDDER_REQ, handlePutBidder);
}

function* watchDeleteBidder() {
    yield takeLatest(DELETE_BIDDER_REQ, handleDeleteBidder);
}

function* watchBidders() {
    yield all([
        watchGetBidder(),
        watchGetBidders(),
        watchPostBidder(),
        watchPutBidder(),
        watchDeleteBidder(),
    ]);
}

export default watchBidders;

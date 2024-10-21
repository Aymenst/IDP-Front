import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {
  DELETE_WINNER_REQ,
  deleteWinnerResp, GET_WINNER_REQ, GET_WINNERS_REQ,
  getWinnerResp,
  getWinnersResp, POST_WINNER_REQ,
  postWinnerResp, PUT_WINNER_REQ,
  putWinnerResp
} from '../redux/actions/winners';
import {setErrorResp, setSuccessResp} from "../redux/actions/RequestHandler";
import {API} from "../config/apiUrl";

const axios = require('axios');

function requestGetWinner({ id }) {
  return axios.request({
    method: 'get',
    url: `${API}/winning-bidders/${id}`,
  });
}

function requestGetWinners({ tenderId, lotId }) {
  return axios.request({
    method: 'get',
    url: `${API}/winning-bidders`,
    params: {
      tenderId,
      lotId
    }
  });
}

function requestPostWinner({ id, payload }) {
  return axios.request({
    method: 'post',
    url: `${API}/winning-bidders/bidders/${id}`,
    data: payload
  });
}

function requestPutWinner(payload) {
  return axios.request({
    method: 'put',
    url: `${API}/winning-bidders/`,
    data: payload
  });
}

function requestDeleteWinner(payload) {
  return axios.request({
    method: 'delete',
    url: `${API}/winning-bidders`,
    data: payload
  });
}

function* handleGetWinner(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestGetWinner, action.payload);
    const { data } = response;
    yield put(getWinnerResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handleGetWinners(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestGetWinners, action.payload);
    const { data } = response;
    yield put(getWinnersResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handlePostWinner(action) {
  try {
    yield put(setErrorResp(false));
    // yield put(setLoading(true));
    const response = yield call(requestPostWinner, action.payload);
    const { data } = response;
    yield put(postWinnerResp(data));
    yield put(setSuccessResp(true));
  } catch (error) {
    yield put(setErrorResp(true));
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handlePutWinner(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestPutWinner, action.payload);
    const { data } = response;
    yield put(putWinnerResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handleDeleteWinner(action) {
  try {
    // yield put(setLoading(true));
    yield call(requestDeleteWinner, action.payload);
    yield put(deleteWinnerResp(action.payload));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* watchGetWinner() {
  yield takeLatest(GET_WINNER_REQ, handleGetWinner);
}

function* watchGetWinners() {
  yield takeLatest(GET_WINNERS_REQ, handleGetWinners);
}

function* watchPostWinner() {
  yield takeLatest(POST_WINNER_REQ, handlePostWinner);
}

function* watchPutWinner() {
  yield takeLatest(PUT_WINNER_REQ, handlePutWinner);
}

function* watchDeleteWinner() {
  yield takeLatest(DELETE_WINNER_REQ, handleDeleteWinner);
}

function* watchWinners() {
  yield all([
    watchGetWinner(),
    watchGetWinners(),
    watchPostWinner(),
    watchPutWinner(),
    watchDeleteWinner()
  ]);
}

export default watchWinners;

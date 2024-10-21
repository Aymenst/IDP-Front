// -------------- SOLVENCY CHECKLIST -----------
import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {
  DELETE_LOT_REQ,
  deleteLotResp, GET_LOT_REQ, GET_LOTS_BY_TENDER_REQ, GET_LOTS_REQ,
  getLotResp,
  getLotsByTenderIdResp,
  getLotsResp, POST_LOT_REQ,
  postLotResp, PUT_CRITERIA_CHECKLIST_REQ, PUT_LOT_REQ, PUT_SOLVENCY_CHECKLIST_REQ, putCriteriaChecklistResp,
  putLotResp, putSolvencyChecklistResp
} from '../redux/actions/lots';
import {setErrorResp, setSuccessResp} from "../redux/actions/RequestHandler";
import {
  PUT_CRITERIA_EVALUATION_REQ,
  PUT_SOLVENCY_EVALUATION_REQ,
  putCriteriaEvaluationResp,
  putSolvencyEvaluationResp
} from "../redux/actions/bidders";
import {API} from "../config/apiUrl";

const axios = require('axios');

function requestPutSolvencyChecklist({ id, payload }) {
  return axios.request({
    method: 'put',
    url: `${API}/lots/${id}/solvency-checklist`,
    data: payload
  });
}

// -------------- CRITERIA CHECKLIST -----------
function requestPutCriteriaChecklist({ id, payload }) {
  return axios.request({
    method: 'put',
    url: `${API}/lots/${id}/criteria-checklist`,
    data: payload
  });
}
// -------------- SOLVENCY CHECKLIST -----------
function requestPutSolvencyEvaluation({ id, payload }) {
  return axios.request({
    method: 'put',
    url: `${API}/bidders/${id}/solvency-evaluation`,
    data: payload
  });
}
// -------------- CRITERIA CHECKLIST -----------
function requestPutCriteriaEvaluation({ id, payload }) {
  return axios.request({
    method: 'put',
    url: `${API}/bidders/${id}/criteria-evaluation`,
    data: payload
  });
}
function* handlePutSolvencyEvaluation(action) {
  try {
    // yield put(setLoading(true));
    yield put(setErrorResp(false));
    const response = yield call(requestPutSolvencyEvaluation, action.payload);
    const { data } = response;
    yield put(putSolvencyEvaluationResp(data));
    yield put(setSuccessResp(true));
  } catch (error) {
    yield put(setErrorResp(true));
    console.log(error);
  }
  // yield put(setLoading(false));
}
function* handlePutCriteriaEvaluation(action) {
  try {
    // yield put(setLoading(true));
    yield put(setErrorResp(false));
    const response = yield call(requestPutCriteriaEvaluation, action.payload);
    const { data } = response;
    yield put(putCriteriaEvaluationResp(data));
    yield put(setSuccessResp(true));
  } catch (error) {
    yield put(setErrorResp(true));
    console.log(error);
  }
  // yield put(setLoading(false));
}
function* watchPutSolvencyEvaluation() {
  yield takeLatest(PUT_SOLVENCY_EVALUATION_REQ, handlePutSolvencyEvaluation);
}
function* watchPutCriteriaEvaluation() {
  yield takeLatest(PUT_CRITERIA_EVALUATION_REQ, handlePutCriteriaEvaluation);
}
function requestGetLot(id) {
  return axios.request({
    method: 'get',
    url: `${API}/lots/${id}`,
  });
}

function requestGetLots() {
  return axios.request({
    method: 'get',
    url: `${API}/lots`
  });
}

function requestGetLotsByTenderId(id) {
  return axios.request({
    method: 'get',
    url: `${API}/tenders/${id}/lots`,
  });
}

function requestPostLot(payload) {
  return axios.request({
    method: 'post',
    url: `${API}/lots`,
    data: payload
  });
}

function requestPutLot(payload) {
  return axios.request({
    method: 'put',
    url: `${API}/lots/${payload.id}`,
    data: payload
  });
}

function requestDeleteLot(payload) {
  return axios.request({
    method: 'delete',
    url: `${API}/lots`,
    data: payload
  });
}

// ------------ CHECKLIST ------------
function* handlePutSolvencyChecklist(action) {
  try {
    // yield put(setError(false));
    yield put(setErrorResp(false));
    const response = yield call(requestPutSolvencyChecklist, action.payload);
    const { data } = response;
    yield put(putSolvencyChecklistResp(data));
    yield put(setSuccessResp(true));
  } catch (error) {
    console.log(error);
    yield put(setErrorResp(true));
    // yield put(setError(true))
  }
  // yield put(setLoading(false));
}

function* handlePutCriteriaChecklist(action) {
  try {
    // yield put(setLoading(true));
    yield put(setErrorResp(false));
    const response = yield call(requestPutCriteriaChecklist, action.payload);
    const { data } = response;
    yield put(putCriteriaChecklistResp(data));
    yield put(setSuccessResp(true));
  } catch (error) {
    yield put(setErrorResp(true));
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handleGetLot(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestGetLot, action.payload);
    const { data } = response;
    yield put(getLotResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handleGetLotsByTenderId(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestGetLotsByTenderId, action.payload);
    const { data } = response;
    yield put(getLotsByTenderIdResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handleGetLots(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestGetLots, action.payload);
    const { data } = response;
    yield put(getLotsResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handlePostLot(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestPostLot, action.payload);
    const { data } = response;
    yield put(postLotResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handlePutLot(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(requestPutLot, action.payload);
    const { data } = response;
    yield put(putLotResp(data));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* handleDeleteLot(action) {
  try {
    // yield put(setLoading(true));
    yield call(requestDeleteLot, action.payload);
    yield put(deleteLotResp(action.payload));
  } catch (error) {
    console.log(error);
  }
  // yield put(setLoading(false));
}

function* watchPutSolvencyChecklist() {
  yield takeLatest(PUT_SOLVENCY_CHECKLIST_REQ, handlePutSolvencyChecklist);
}
function* watchPutCriteriaChecklist() {
  yield takeLatest(PUT_CRITERIA_CHECKLIST_REQ, handlePutCriteriaChecklist);
}
// -----------------------------------
function* watchGetLot() {
  yield takeLatest(GET_LOT_REQ, handleGetLot);
}

function* watchGetLotsByTenderId() {
  yield takeLatest(GET_LOTS_BY_TENDER_REQ, handleGetLotsByTenderId);
}

function* watchGetLots() {
  yield takeLatest(GET_LOTS_REQ, handleGetLots);
}

function* watchPostLot() {
  yield takeLatest(POST_LOT_REQ, handlePostLot);
}

function* watchPutLot() {
  yield takeLatest(PUT_LOT_REQ, handlePutLot);
}

function* watchDeleteLot() {
  yield takeLatest(DELETE_LOT_REQ, handleDeleteLot);
}

function* watchLots() {
  yield all([
    watchGetLot(),
    watchGetLots(),
    watchPostLot(),
    watchPutLot(),
    watchDeleteLot(),
    watchGetLotsByTenderId(),
    watchPutSolvencyChecklist(),
    watchPutCriteriaChecklist(),
    watchPutSolvencyEvaluation(),
    watchPutCriteriaEvaluation(),
  ]);
}

export default watchLots;

import {
  all, call, put, takeLatest
} from 'redux-saga/effects';
import {
  DELETE_TENDER_REQ,
  deleteTenderResp, GET_TENDER_REQ, GET_TENDERS_REQ,
  getTenderResp,
  getTendersResp, POST_TENDER_REQ,
  postTenderResp, PUT_TENDER_REQ,
  putTenderResp
} from '../redux/actions/tenders';
import {
  SET_ACTION_ERROR_MESSAGE_REQ, SET_ACTION_LOADER_REQ,
  SET_ACTION_SUCCESS_REQ, SET_ACTION_ERROR_REQ,
  setErrorMessageResp, setLoaderResp,
  setSuccessResp, setErrorResp
} from '../redux/actions/RequestHandler';
import {API} from "../config/apiUrl";

const axios = require('axios');

function requestGetTender(id) {
  return axios.request({
    method: 'get',
    url: `${API}/tenders/${id}`,
  });
}

function requestGetTenders() {
  return axios.request({
    method: 'get',
    url: `${API}/tenders`,
  });
}

function requestPostTender(tender) {
  let req_tender = {
    registerNumber: tender.registerNumber,
    name: tender.name,
    departmentA: tender.departmentA,
    departmentB: tender.departmentB,
    departmentC: tender.departmentC,
    beginningDate: tender.beginningDate,
    proposalLimitDate: tender.proposalLimitDate,
    valuationLimitDate: tender.valuationLimitDate,
    provisionalAwardDate: tender.provisionalAwardDate,
    documentationLimitDate: tender.documentationLimitDate,
    definitiveAwardDate: tender.definitiveAwardDate,
    documents: tender.documents,
    lots: tender.lots,
    administrativeDocCheckList: tender.administrativeDocCheckList,
    client: tender.client
  };
  req_tender = JSON.stringify(req_tender);
  const blob = new Blob([req_tender], {
    type: 'application/json'
  });
  console.log(req_tender);
  const data = new FormData();

  data.append('tender', blob);
  for (let i = 0; i < tender.files.length; i++) {
    data.append('files', tender.files[i]);
  }

  return axios.request({
    method: 'post',
    url: `${API}/tenders`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
}

function requestPutTender(tender) {
  let req_tender = {
    id: tender.id,
    registerNumber: tender.registerNumber,
    name: tender.name,
    departmentA: tender.departmentA,
    departmentB: tender.departmentB,
    departmentC: tender.departmentC,
    beginningDate: tender.beginningDate,
    proposalLimitDate: tender.proposalLimitDate,
    valuationLimitDate: tender.valuationLimitDate,
    provisionalAwardDate: tender.provisionalAwardDate,
    documentationLimitDate: tender.documentationLimitDate,
    definitiveAwardDate: tender.definitiveAwardDate,
    documents: tender.documents,
    lots: tender.lots,
    administrativeDocCheckList: tender.administrativeDocCheckList
  };
  req_tender = JSON.stringify(req_tender);
  const blob = new Blob([req_tender], {
    type: 'application/json'
  });
  console.log(req_tender);
  const data = new FormData();

  data.append('tender', blob);
  for (let i = 0; i < tender.files.length; i++) {
    data.append('files', tender.files[i]);
  }
  return axios.request({
    method: 'put',
    url: `${API}/tenders`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
}

function requestDeleteTender(tenderIds) {
  return axios.request({
    method: 'delete',
    url: `${API}/tenders`,
    data: tenderIds
  });
}

function* handleGetTender(action) {
  try {
    const response = yield call(requestGetTender, action.payload);
    const { data } = response;
    yield put(getTenderResp(data));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetTenders(action) {
  try {
    setErrorResp(false);
    const response = yield call(requestGetTenders);
    const { data } = response;
    yield put(getTendersResp(data));
  } catch (error) {
    setErrorResp(true);
    console.log(error);
  }
}

function* handlePostTender(action) {
  try {
    yield put(setErrorMessageResp(null));
    yield put(setErrorResp(false));
    // yield put(actionLoading(false));
    const response = yield call(requestPostTender, action.payload);
    const { data } = response;
    yield put(postTenderResp(data));
    // yield put(actionLoading(false));
    yield put(setSuccessResp(true));
  } catch (error) {
    const { response } = error;
    yield put(setErrorResp(true));
    yield put(setErrorMessageResp(response.data));

    console.log('ghjkl');
    console.log('saga aborted due to:', response.data);
  } finally {
  }
}

function* handlePutTender(action) {
  try {
    yield put(setErrorMessageResp(null));
    yield put(setErrorResp(false));
    const response = yield call(requestPutTender, action.payload);
    const { data } = response;
    console.warn(data);
    yield put(putTenderResp(data));
    yield put(setSuccessResp(true));
  } catch (error) {
    const { response } = error;
    yield put(setErrorResp(true));
    yield put(setErrorMessageResp(response.data));

  }
}

function* handleDeleteTender(action) {
  try {
    yield call(requestDeleteTender, action.payload);
    yield put(deleteTenderResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* setErrorTender(action) {
  try {
    yield put(setErrorResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchErrorTender() {
  yield takeLatest(SET_ACTION_ERROR_REQ, setErrorTender);
}

function* watchGetTender() {
  yield takeLatest(GET_TENDER_REQ, handleGetTender);
}

function* watchGetTenders() {
  yield takeLatest(GET_TENDERS_REQ, handleGetTenders);
}

function* watchPostTender() {
  yield takeLatest(POST_TENDER_REQ, handlePostTender);
}

function* watchPutTender() {
  yield takeLatest(PUT_TENDER_REQ, handlePutTender);
}

function* watchDeleteTender() {
  yield takeLatest(DELETE_TENDER_REQ, handleDeleteTender);
}


// ------------------------
function* setError(action) {
  try {
    yield put(setErrorResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchError() {
  yield takeLatest(SET_ACTION_ERROR_REQ, setError);
}
function* setErrorMessage(action) {
  try {
    yield put(setErrorMessageResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchErrorMessage() {
  yield takeLatest(SET_ACTION_ERROR_MESSAGE_REQ, setErrorMessage);
}
function* setSuccess(action) {
  try {
    yield put(setSuccessResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchSuccess() {
  yield takeLatest(SET_ACTION_SUCCESS_REQ, setSuccess);
}
function* setLoader(action) {
  try {
    yield put(setLoaderResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchLoader() {
  yield takeLatest(SET_ACTION_LOADER_REQ, setLoader);
}

function* watchTenders() {
  yield all([
    watchGetTender(),
    watchGetTenders(),
    watchPostTender(),
    watchPutTender(),
    watchDeleteTender(),
    watchErrorTender(),
    watchError(),
    watchLoader(),
    watchErrorMessage(),
    watchSuccess(),
  ]);
}


export default watchTenders;

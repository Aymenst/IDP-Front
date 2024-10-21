import {
  all, call, put, takeLatest
} from 'redux-saga/effects';

import {
  DELETE_CPV_CODE_REQ, deleteCpvCodeResp,
  GET_CPV_CODE_REQ, GET_CPV_CODES_REQ,
  getCpvCodeResp,
  getCpvCodesResp, POST_CPV_CODE_REQ,
  postCpvCodeResp, PUT_CPV_CODE_REQ, putCpvCodeResp, UPLOAD_CPV_CODES_REQ, uploadCpvCodesResp
} from '../redux/actions/CpvCode';
import { setSuccessResp } from '../redux/actions/RequestHandler';
import {API} from "../config/apiUrl";

const axios = require('axios');

function requestGetCpvCode(id) {
  return axios.request({
    method: 'get',
    url: `${API}/cpv-codes/${id}`,
  });
}

function requestGetCpvCodes() {
  return axios.request({
    method: 'get',
    url: `${API}/cpv-codes`,
  });
}

function requestPostCpvCode(cpvCode) {
  return axios.request({
    method: 'post',
    url: `${API}/cpv-codes`,
    data: cpvCode
  });
}

function requestUploadCpvCode({ delimiter, file }) {
  const data = new FormData();
  data.append('delimiter', delimiter);
  data.append('file', file);

  return axios.request({
    method: 'post',
    url: `${API}/cpv-codes/upload-csv`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
}

function requestPutCpvCode(cpvCode) {
  return axios.request({
    method: 'put',
    url: `${API}/cpv-codes`,
    data: cpvCode
  });
}

function requestDeleteCpvCode(cpvCodeIds) {
  return axios.request({
    method: 'delete',
    url: `${API}/cpv-codes`,
    data: cpvCodeIds
  });
}

function* handleGetCpvCode(action) {
  try {
    const response = yield call(requestGetCpvCode, action.payload);
    const { data } = response;
    yield put(getCpvCodeResp(data));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetCpvCodes(action) {
  try {
    // setErrorResp(false);
    const response = yield call(requestGetCpvCodes);
    const { data } = response;
    yield put(getCpvCodesResp(data));
  } catch (error) {
    // setErrorResp(true);
    console.log(error);
  }
}

function* handleUploadCpvCodes(action) {
  try {
    // setErrorResp(false);
    const response = yield call(requestUploadCpvCode, action.payload);
    const { data } = response;
    yield put(uploadCpvCodesResp(data));
  } catch (error) {
    // setErrorResp(true);
    console.log(error);
  }
}

function* handlePostCpvCode(action) {
  try {
    // yield put(setErrorMessageResp(null));
    // yield put(setErrorResp(false));
    // yield put(actionLoading(false));
    const response = yield call(requestPostCpvCode, action.payload);
    const { data } = response;
    yield put(postCpvCodeResp(data));
    // yield put(actionLoading(false));
    yield put(setSuccessResp(true));
  } catch (error) {
    const { response } = error;
    // yield put(setErrorResp(true));
    // yield put(setErrorMessageResp(response.data));

    console.log('ghjkl');
    console.log('saga aborted due to:', response.data);
    return 0;
  } finally {
  }
  console.log('outside');
}

function* handlePutCpvCode(action) {
  try {
    // yield put(actionLoading(false));
    const response = yield call(requestPutCpvCode, action.payload);
    const { data } = response;
    console.warn(data);
    yield put(putCpvCodeResp(data));
    // yield put(actionLoading(false));
  } catch (error) {
    // setErrorResp(true);
    // yield put(actionError(error.message));
    console.log(error);
  }
}

function* handleDeleteCpvCode(action) {
  try {
    yield call(requestDeleteCpvCode, action.payload);
    yield put(deleteCpvCodeResp(action.payload));
  } catch (error) {
    console.log(error);
  }
}

// function* setErrorCpvCode(action) {
//     try {
//         yield put(setErrorResp(action.payload));
//     } catch (error) {
//         console.log(error);
//     }
// }

// function* watchErrorCpvCode() {
//     yield takeLatest(SET_ACTION_ERROR_REQ, setErrorTender);
// }

function* watchGetCpvCode() {
  yield takeLatest(GET_CPV_CODE_REQ, handleGetCpvCode);
}

function* watchGetCpvCodes() {
  yield takeLatest(GET_CPV_CODES_REQ, handleGetCpvCodes);
}
function* watchUploadCpvCodes() {
  yield takeLatest(UPLOAD_CPV_CODES_REQ, handleUploadCpvCodes);
}
function* watchPostCpvCode() {
  yield takeLatest(POST_CPV_CODE_REQ, handlePostCpvCode);
}

function* watchPutCpvCode() {
  yield takeLatest(PUT_CPV_CODE_REQ, handlePutCpvCode);
}

function* watchDeleteCpvCode() {
  yield takeLatest(DELETE_CPV_CODE_REQ, handleDeleteCpvCode);
}


// ------------------------
// function* setError(action) {
//     try {
//         yield put(setErrorResp(action.payload));
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// function* watchError() {
//     yield takeLatest(SET_ACTION_ERROR_REQ, setError);
// }
//
// function* setErrorMessage(action) {
//     try {
//         yield put(setErrorMessageResp(action.payload));
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// function* watchErrorMessage() {
//     yield takeLatest(SET_ACTION_ERROR_MESSAGE_REQ, setErrorMessage);
// }
//
// function* setSuccess(action) {
//     try {
//         yield put(setSuccessResp(action.payload));
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// function* watchSuccess() {
//     yield takeLatest(SET_ACTION_SUCCESS_REQ, setSuccess);
// }
//
// function* setLoader(action) {
//     try {
//         yield put(setLoaderResp(action.payload));
//     } catch (error) {
//         console.log(error);
//     }
// }
//
// function* watchLoader() {
//     yield takeLatest(SET_ACTION_LOADER_REQ, setLoader);
// }

function* watchCpvCodes() {
  yield all([
    watchGetCpvCode(),
    watchGetCpvCodes(),
    watchPostCpvCode(),
    watchPutCpvCode(),
    watchDeleteCpvCode(),
    watchUploadCpvCodes(),
    // watchErrorTender(),
    // watchError(),
    // watchLoader(),
    // watchErrorMessage(),
    // watchSuccess(),
  ]);
}


export default watchCpvCodes;

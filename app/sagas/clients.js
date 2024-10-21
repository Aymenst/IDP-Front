import {
  all, takeLatest, call, put
} from 'redux-saga/effects';
import axios from 'axios';
import {
  DELETE_CLIENT_REQ, deleteClientsResp,
  GET_CLIENT_REQ,
  GET_CLIENTS_REQ, getClientResp, getClientsResp,
  POST_CLIENT_REQ, postClientResp,
  PUT_CLIENT_REQ, putClientResp
} from '../redux/actions/clients';
import {API} from "../config/apiUrl";

const requestGetClient = ({ id }) => axios.request({
  method: 'get',
  url: `${API}/clients/${id}`,
});
const handleGetClient = function* handleGetClient(action) {
  try {
    const response = yield call(requestGetClient, action.payload);
    const { data } = response;
    yield put(getClientResp(data));
  } catch (error) {
    console.log(error);
  }
};
function* watchGetClient() {
  yield takeLatest(GET_CLIENT_REQ, handleGetClient);
}

const requestGetClients = () => axios.request({
  method: 'get',
  url: `${API}/clients`
});
const handleGetClients = function* handleGetClients(action) {
  try {
    const response = yield call(requestGetClients, action.payload);
    const { data } = response;
    yield put(getClientsResp(data));
  } catch (error) {
    console.log(error);
  }
};
function* watchGetClients() {
  yield takeLatest(GET_CLIENTS_REQ, handleGetClients);
}

const requestPostClient = (payload) => axios.request({
  method: 'post',
  url: `${API}/clients`,
  data: payload
});
const handlePostClient = function* handlePostClient(action) {
  try {
    const response = yield call(requestPostClient, action.payload);
    const { data } = response;
    yield put(postClientResp(data));
  } catch (error) {
    console.log(error);
  }
};
function* watchPostClient() {
  yield takeLatest(POST_CLIENT_REQ, handlePostClient);
}

const requestPutClient = (id, payload) => axios.request({
  method: 'put',
  url: `${API}/clients/${id}`,
  data: payload
});
const handlePutClient = function* handlePutClient(action) {
  try {
    const response = yield call(requestPutClient, action.payload.id, action.payload.payload);
    const { data } = response;
    yield put(putClientResp(data));
  } catch (error) {
    console.log(error);
  }
};
function* watchPutClient() {
  yield takeLatest(PUT_CLIENT_REQ, handlePutClient);
}

const requestDeleteClient = (payload) => axios.request({
  method: 'delete',
  url: `${API}/clients`,
  data: payload
});
const handleDeleteClient = function* handleDeleteClient(action) {
  try {
    yield call(requestDeleteClient, action.payload);
    yield put(deleteClientsResp(action.payload));
  } catch (error) {
    console.log(error);
  }
};
function* watchDeleteClient() {
  yield takeLatest(DELETE_CLIENT_REQ, handleDeleteClient);
}

function* watchClients() {
  yield all([
    watchGetClient(),
    watchGetClients(),
    watchPostClient(),
    watchPutClient(),
    watchDeleteClient()
  ]);
}

export default watchClients;

import {
  all, takeLatest, call, put
} from 'redux-saga/effects';
import axios from 'axios';
import {
  DELETE_CONTRACT_REQ, deleteContractsResp,
  GET_CONTRACT_REQ,
  GET_CONTRACTS_REQ, getContractResp, getContractsResp,
  POST_CONTRACT_REQ, postContractResp,
  PUT_CONTRACT_REQ, putContractResp
} from '../redux/actions/contracts';
import {API} from "../config/apiUrl";

const requestGetContract = payload => axios.request({
  method: 'get',
  url: `${API}/clients/${payload.clientId}/contracts/${payload.id}`
});
const handleGetContract = function* handleGetContract(action) {
  try {
    const response = yield call(requestGetContract, action.payload);
    const { data } = response;
    yield put(getContractResp(data));
  } catch (error) {
    console.log(error);
  }
};

function* watchGetContract() {
  yield takeLatest(GET_CONTRACT_REQ, handleGetContract);
}

const requestGetContracts = payload => axios.request({
  method: 'get',
  url: `${API}/clients/${payload.clientId}/contracts`
});
const handleGetContracts = function* handleGetContracts(action) {
  try {
    const response = yield call(requestGetContracts, action.payload);
    const { data } = response;
    yield put(getContractsResp(data));
  } catch (error) {
    console.log(error);
  }
};

function* watchGetContracts() {
  yield takeLatest(GET_CONTRACTS_REQ, handleGetContracts);
}

const requestPostContract = ({ clientId, contract }) => {
  const data = new FormData();
  contract.legalDocuments = contract.legalDocuments ? contract.legalDocuments : [];
  contract.technicalDocuments = contract.technicalDocuments ? contract.technicalDocuments : [];
  contract.economicalDocuments = contract.economicalDocuments ? contract.economicalDocuments : [];
  contract.otherDocuments = contract.otherDocuments ? contract.otherDocuments : [];
  let req_contract = {
    name: contract.name,
    supplierName: contract.supplierName,
    signingDate: contract.signingDate,
    beginningDate: contract.beginningDate,
    finishingDate: contract.finishingDate,
    amountEuro: contract.amountEuro,
    amountLocal: contract.amountLocal,
    currencyType: contract.currencyType,
    documents: contract.legalDocuments
      .concat(contract.technicalDocuments)
      .concat(contract.economicalDocuments)
      .concat(contract.otherDocuments),
  };
  req_contract = JSON.stringify(req_contract);
  data.append('contract', req_contract);

  for (let i = 0; i < contract.legalFiles.length; i++) {
    data.append('files', contract.legalFiles[i]);
  }
  for (let i = 0; i < contract.technicalFiles.length; i++) {
    data.append('files', contract.technicalFiles[i]);
  }
  for (let i = 0; i < contract.economicalFiles.length; i++) {
    data.append('files', contract.economicalFiles[i]);
  }
  for (let i = 0; i < contract.otherFiles.length; i++) {
    data.append('files', contract.otherFiles[i]);
  }

  return axios.request({
    method: 'post',
    url: `${API}/clients/${clientId}/contracts`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  });
};
const handlePostContract = function* handlePostContract(action) {
  try {
    const response = yield call(requestPostContract, action.payload);
    const { data } = response;
    yield put(postContractResp(data));
  } catch (error) {
    console.log(error);
  }
};
function* watchPostContract() {
  yield takeLatest(POST_CONTRACT_REQ, handlePostContract);
}

const requestPutContract = ({ clientId, contract }) => axios.request({
  method: 'put',
  url: `${API}/clients/${clientId}/contracts/${contract.id}`,
  data: contract
});
const handlePutContract = function* handlePutContract(action) {
  try {
    const response = yield call(requestPutContract, action.payload);
    const { data } = response;
    yield put(putContractResp(data));
  } catch (error) {
    console.log(error);
  }
};
function* watchPutContract() {
  yield takeLatest(PUT_CONTRACT_REQ, handlePutContract);
}

const requestDeleteContract = ({ clientId, contractIds }) => axios.request({
  method: 'delete',
  url: `${API}/clients/${clientId}/contracts`,
  data: contractIds
});
const handleDeleteContract = function* handleDeleteContract(action) {
  try {
    yield call(requestDeleteContract, action.payload);
    yield put(deleteContractsResp(action.payload.contractIds));
  } catch (error) {
    console.log(error);
  }
};
function* watchDeleteContract() {
  yield takeLatest(DELETE_CONTRACT_REQ, handleDeleteContract);
}

function* watchContracts() {
  yield all([
    watchGetContract(),
    watchGetContracts(),
    watchPostContract(),
    watchPutContract(),
    watchDeleteContract()
  ]);
}

export default watchContracts;

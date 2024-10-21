import axios from "axios";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {POST_LOGIN_REQ, postLoginResp} from "../redux/actions/auth";
import {API} from "../config/apiUrl";


const requestLogin = (payload) => axios.request({
    method: 'post',
    url: `${API}/auth/login`,
    data: payload
});
const handlePostLogin = function* handlePostLogin(action) {
    try {
        const response = yield call(requestLogin, action.payload);
        const { data } = response;
        yield put(postLoginResp(data));
    } catch (error) {
        console.log(error);
        yield put(postLoginResp({token: null, user: null}));
    }
};
function* watchPostLogin() {
    yield takeLatest(POST_LOGIN_REQ, handlePostLogin);
}

function* watchAuth() {
    yield all([
        watchPostLogin(),
    ]);
}

export default watchAuth;

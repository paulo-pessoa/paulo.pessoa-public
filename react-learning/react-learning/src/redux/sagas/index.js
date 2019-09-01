import { put, takeEvery, fork, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

function* handleDefault() {
    console.log("handleDefault saga");
    yield(put({ type: actionTypes.DEFAULT_ACTION_HANDLED }));
}

function* watchDefaultAction() {
    console.log("default action");
    yield takeEvery(actionTypes.DEFAULT_ACTION, handleDefault);
}

export default function* rootSaga() {
    yield all([
        fork(watchDefaultAction)
    ]);
}
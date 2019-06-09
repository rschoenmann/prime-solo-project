import {all} from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import promptSaga from './promptSaga';
import reviewSaga from './reviewSaga';
import daySaga from './daySaga';
import datesSaga from './datesSaga';
import gradientSaga from './gradientSaga';
import singleSaga from './singleDaySaga';
import statsSaga from './statsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    promptSaga(),
    reviewSaga(),
    daySaga(),
    datesSaga(),
    gradientSaga(),
    singleSaga(),
    statsSaga(),
  ]);
}

import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchGradient() {
	try {
		const response = yield axios.get('api/gradient');
		yield put({type: 'SET_GRADIENT', payload: response.data});
	} catch (error) {
		console.log('Gradient get request failed', error);
	}
}
function* gradientSaga() {
	yield takeLatest('FETCH_GRADIENT', fetchGradient);
}

export default gradientSaga;
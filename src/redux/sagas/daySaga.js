import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchDay() {
	try {
		const response = yield axios.get('api/day');
		yield put({type: 'SET_DAY', payload: response.data });
	} catch (error) {
		console.log('Day get request failed', error);
	}
}
function* daySaga() {
	yield takeLatest('FETCH_DAY', fetchDay);
}

export default daySaga;
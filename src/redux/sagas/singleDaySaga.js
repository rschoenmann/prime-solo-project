import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchSingleDay(action) {
	try {
		const response = yield axios.get(`/api/singleDay/${action.payload}`);
		yield put({type: 'SET_SINGLE_DAY', payload: response.data});
	} catch (error) {
		console.log('single day get request failed', error);
	}
}

function* singleDaySaga() {
	yield takeLatest('FETCH_SINGLE_DAY', fetchSingleDay);
}

export default singleDaySaga;
	
	
import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchSingleDay(action) {
	try {
		console.log('single day action', action.payload)
		const response = yield axios.get(`/api/day/single/${action.payload}`);
		yield put({type: 'SET_DAY', payload: response.data});
	} catch (error) {
		console.log('single day get request failed', error);
	}
}

function* singleDaySaga() {
	yield takeLatest('FETCH_SINGLE_DAY', fetchSingleDay);
}

export default singleDaySaga;
	
	
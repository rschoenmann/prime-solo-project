import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* dateRange(action) {
	try {
		console.log('stats date action.payload:', action.payload)
		let query = `?startDate=${action.payload[0]}&endDate=${action.payload[1]}`
		const response = yield axios.get(`/api/stats/rating${query}`)
		//yield put({type: 'SET_DATES', payload: response.data});
	} catch (error) {
		console.log('Stats date range request failed', error)
	}
}

function* statsSaga() {
	yield takeLatest('STATS_DATE_RANGE', dateRange);
}

export default statsSaga;
import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchDates(action) {
	try {
		//console.log('fetchDates action.payload:', action.payload)
		let query = `?startDate=${action.payload.startDate}&endDate=${action.payload.endDate}`
		const response = yield axios.get(`/api/day/dates${query}`)
		yield put({type: 'SET_DATES', payload: response.data});
	} catch (error) {
		console.log('Dates get request failed', error)
	}
}

function* datesSaga() {
	yield takeLatest('FETCH_DATES', fetchDates);
}

export default datesSaga;
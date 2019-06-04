import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchDates(action) {
	try{
		console.log('fetchDates action.payload:', action.payload)
		let query = `?startDate=${action.payload.dateRange[0]}&endDate=${action.payload.dateRange[1]}`
		const response = yield axios.get(`/api/day/dates${query}`)
	} catch (error) {
		console.log('Day dates get request failed', error)
	}
}

function* fetchDay() {
	try {
		const response = yield axios.get('api/day');
		yield put({type: 'SET_DAY', payload: response.data });
	} catch (error) {
		console.log('Day get request failed', error);
	}
}

function* deleteDay(action){
	try{
		console.log('deleteDay action.payload:', action.payload);
		yield axios.delete(`api/day/${action.payload}`);
		yield put({type: 'FETCH_DAY'})
	}catch (error){
		console.log('Day delete request failed', error)
	}
}

function* daySaga() {
	yield takeLatest('FETCH_DAY', fetchDay);
	yield takeLatest('DELETE_DAY', deleteDay);
	yield takeLatest('FETCH_DATES', fetchDates);
}

export default daySaga;
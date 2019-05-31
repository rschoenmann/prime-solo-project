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
}

export default daySaga;
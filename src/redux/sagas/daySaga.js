import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* editDay(action){
	try{
		//console.log('editDay action', action.payload)
		yield axios.put('/api/day', action.payload)
		yield put({type: 'FETCH_SINGLE_DAY', payload: action.payload.id})
	} catch (error){
		console.log('edit day request failed', error)
	}
}

function* fetchDay() {
	try {
		const response = yield axios.get('api/day');
		yield put({type: 'SET_DAY', payload: response.data});
	} catch (error) {
		console.log('Day get request failed', error);
	}
}

function* deleteDay(action){
	try{
		//console.log('deleteDay action.payload:', action.payload);
		yield axios.delete(`api/day/${action.payload}`);
		yield put({type: 'FETCH_DAY'})
	}catch (error){
		console.log('Day delete request failed', error)
	}
}

function* daySaga() {
	yield takeLatest('FETCH_DAY', fetchDay);
	yield takeLatest('DELETE_DAY', deleteDay);
	yield takeLatest('EDIT_DAY', editDay);
}

export default daySaga;
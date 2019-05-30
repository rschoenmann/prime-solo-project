import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* addReview(action) {
	try {
		const response = yield axios.post('api/day', action.payload);
		yield put({type: 'SET_DAY', payload: response.data});
		//clear review reduxState after submitting so it's empty for next time
		yield put({type: 'CLEAR_REVIEW'});
	} catch (error) {
		console.log('Day post failed', error);
	}
}
function* reviewSaga() {
	yield takeLatest('ADD_REVIEW', addReview);
}

export default reviewSaga;
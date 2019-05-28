import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchPrompt() {
	try {
		const response = yield axios.get('api/prompt');
		yield put({ type: 'SET_PROMPT', payload: response.data });
	} catch (error) {
		console.log('Prompt get request failed', error);
	}
}
function* promptSaga() {
	yield takeLatest('FETCH_PROMPT', fetchPrompt);
}

export default promptSaga;
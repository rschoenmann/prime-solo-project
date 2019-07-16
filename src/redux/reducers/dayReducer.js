import moment from 'moment';

const dayReducer = (state=[], action) => {
	if(action.type==='SET_DAY'){
		//console.log('dayreducer ', action.payload);
		//console.log('dayreducer date:', moment(action.payload.date).format('YYYY-MM-DD'))
		return action.payload;
	}else{
		return state;
	}
}

export default dayReducer;
const singleDayReducer = (state=[], action) => {
	switch(action.type){
		case 'SET_SINGLE_DAY':
			return action.payload;
		default:
			return state;
	}
}

export default singleDayReducer;
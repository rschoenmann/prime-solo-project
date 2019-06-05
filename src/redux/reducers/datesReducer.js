const datesReducer = (state=[], action) => {
	switch(action.type){
		case 'SET_DATES':
			return action.payload;
		default:
			return state;
	}
}

export default datesReducer;
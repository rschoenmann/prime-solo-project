const statsReducer = (state=[], action) => {
	switch(action.type){
		case '':
			return action.payload;
		default:
			return state;
	}
}

export default statsReducer;
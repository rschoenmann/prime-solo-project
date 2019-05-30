const dayReducer = (state=[], action) => {
	switch(action.type){
		case 'SET_DAY':
			return action.payload;
		default:
			return state;
	}
}

export default dayReducer;
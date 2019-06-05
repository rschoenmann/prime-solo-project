const gradientReducer = (state=[], action) => {
	switch(action.type){
		case 'SET_GRADIENT':
			return action.payload;
		default:
			return state;
	}
}

export default gradientReducer;
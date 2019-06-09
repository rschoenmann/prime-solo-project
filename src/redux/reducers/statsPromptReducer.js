const statsPromptReducer = (state=[], action) => {
	switch(action.type){
		case 'SET_PROMPT_STATS':
			return action.payload;
		default:
			return state;
	}
}

export default statsPromptReducer;
const review =
	{date: '', 1: false, 2: false, 3: false, 4: false, 5: false, value: 0, notes: ''};

const reviewReducer = (state=review, action) => {
	switch(action.type){
		case 'SET_REVIEW_CHECK':
			return {...state, [action.payload]: !(state[action.payload])};
		case 'SET_REVIEW_RATING':
			return {...state, value: action.payload};
		case 'SET_REVIEW_NOTES':
			return {...state, notes: action.payload};
		case 'SET_REVIEW_DATE':
			return {...state, date: action.payload}
		case 'CLEAR_REVIEW':
			return {};
		default:
			return state;
	}
}

export default reviewReducer;
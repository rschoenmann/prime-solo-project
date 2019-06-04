import React, {Component} from 'react';
import Rating from 'react-rating';
import {Star, StarBorder} from '@material-ui/icons';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';

class StarRating extends Component{

	state = {
		//need to set local state in order to give initialRating a starting value
		value: 0
	}

	handleRating = (starValue) => {
	console.log('rating value:', starValue)
	//sending starValue to review reducer to store in a single 'review' state
	this.props.dispatch({type: 'SET_REVIEW_RATING', payload: starValue})
	};//end handleRating

	render(){
		return(
			<>
			<Rating data-tip="1 being the worst, 5 being the best"
				initialRating={this.state.value}
				onChange={this.handleRating}
				emptySymbol={<StarBorder />}
				fullSymbol={<Star />}
				start={0} stop={5} />
				<ReactTooltip />
			</>
		)
	}
}

export default connect()(StarRating);
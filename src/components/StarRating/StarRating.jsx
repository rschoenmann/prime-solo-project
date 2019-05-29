import React, {Component} from 'react';
import Rating from 'react-rating';
import {Star, StarBorder} from '@material-ui/icons';

class StarRating extends Component{

	//need to set local state to hold rating value via initialRating props and handleRating setState, 
	//otherwise the rating would reset itself anytime the AddDay form refreshed (if user changes checkboxes, etc)
	state = {
		value: 0
	}

	handleRating = (value) => {
	console.log('rating value:', value)
	this.setState({
		value: value
	})
	this.props.onChange(value);
	};//end handleRating


	render(){
		return(
			<Rating
				initialRating={this.props.value}
				onChange={this.handleRating}
				emptySymbol={<StarBorder />}
				fullSymbol={<Star />}
				start={0} stop={5} />
		)
	}
}

export default StarRating;
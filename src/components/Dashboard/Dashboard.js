import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import Rating from 'react-rating';

class Dashboard extends Component {

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_DAY'})
	};//end componentDidMount

	render() {
		return (
			<div>
				<p>Dashboard</p>
				<button>Add a new day</button>

				{this.props.day.map((aDay) => {
					return(
						<div key={aDay.id}>
							<p>Date: {aDay.date}</p>
							<p>Did you get enough sleep last night <Checkbox value={aDay.prompt1}
								checked={aDay.prompt1} color="primary" disabled/></p>
							<p>Did you drink enough water today? <Checkbox value={aDay.prompt2}
								checked={aDay.prompt2} color="primary" disabled/></p>
							<p>Did you go outside today? <Checkbox value={aDay.prompt3}
								checked={aDay.prompt3} color="primary" disabled/></p>
							<p>Did you take your meds today? <Checkbox value={aDay.prompt4}
								checked={aDay.prompt4} color="primary" disabled/></p>
							<p>Did you talk to a friend today? <Checkbox value={aDay.prompt5}
								checked={aDay.prompt5} color="primary" disabled/></p>
							<p>Rating: <Rating initialRating={aDay.rating}
								emptySymbol={<StarBorder />}
								fullSymbol={<Star />}
								start={0} stop={5} readonly /></p>
							<p>Notes: {aDay.notes}</p>
						</div>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	day: state.day,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
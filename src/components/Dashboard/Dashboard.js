import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, TextField, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText, Button} from '@material-ui/core';

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
						<FormControlLabel key={aDay.id}
							control={<Checkbox value={aDay.id}
								checked={aDay.prompt1} color="primary" />}
							label={aDay.prompt1} />
						// <div key={aDay.id}>
						// 	<p>Date: {aDay.date}</p>
						// 	<p>{aDay.prompt1}</p>
						// 	<p>{aDay.prompt2}</p>
						// 	<p>{aDay.prompt3}</p>
						// 	<p>{aDay.prompt4}</p>
						// 	<p>{aDay.prompt5}</p>
						// 	<p>{aDay.rating}</p>
						// 	<p>{aDay.notes}</p>
						// </div>
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
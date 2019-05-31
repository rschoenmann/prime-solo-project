import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import Rating from 'react-rating';

class Dashboard extends Component {

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_DAY'})
	};//end componentDidMount

	handleAdd = () => {
		this.props.history.push('/addDay')
	}

	handleDelete = (dayid) => {
		console.log('DELETE id:', dayid)
		this.props.dispatch({type: 'DELETE_DAY', payload: dayid})
	};//end handleDelete

	handleEdit = () => {
		console.log('EDIT')
	};//end handleEdit

	render() {
		return (
			<div>
				<pre>{JSON.stringify(this.props.day)}</pre>
				<h3>Dashboard!</h3>
				<Button variant="contained" color="primary" onClick={this.handleAdd}>Add New Day</Button>
				<br></br><br></br>
				<h3>Previous Days:</h3>
				{this.props.day.map((aDay) => {
					return(
						<div key= {aDay.reviewid}>
						<Card raised>
						  <CardContent>
							Date: {aDay.date}
								{aDay.answers.map((answer, i) => {
									return (
										<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
											checked={answer.promptAnswer} color="primary" disabled /></p>
									)
								})}
							Rating: <Rating initialRating={aDay.rating}
								emptySymbol={<StarBorder />}
								fullSymbol={<Star />}
								start={0} stop={5} readonly />
								<br></br>
							Notes: {aDay.notes}
						  </CardContent>
						  <CardActions>
						    <Button variant="outlined" color="primary" onClick={this.handleEdit}>Edit Day</Button>
							<Button variant="outlined" color="secondary" onClick={() => this.handleDelete(aDay.reviewid)}>Delete Day</Button>
						  </CardActions>
						</Card>
						<br></br><br></br>
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
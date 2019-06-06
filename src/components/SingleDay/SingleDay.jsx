import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, TextField} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import moment from 'moment';
import Moment from 'react-moment';
import Rating from 'react-rating';
import Swal from 'sweetalert2';
import StarRating from '../StarRating/StarRating';

class SingleDay extends Component{

	state = {
		dayEditable: false,
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_SINGLE_DAY', payload: this.props.match.params.id});
		this.props.dispatch({type: 'FETCH_PROMPT'})
	}

	handleDelete = (dayid) => {
		console.log('DELETE id:', dayid)
		Swal.fire({
			title: 'Are you sure you want to delete this day?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				this.props.dispatch({ type: 'DELETE_DAY', payload: dayid })
				Swal.fire(
					'Deleted!',
					'Day has been deleted.',
					'success')
			}//end if statement
		});
	};//end handleDelete

	handleEdit = () => {
		this.setState({
			dayEditable: !this.state.dayEditable
		})
	};//end handleEdit


	render(){
		let dayDate = moment(this.props.single.date).format('dddd, MMMM Do YYYY');
		return(
			<>
				{this.state.dayEditable ?
				<>
					{this.props.single.map((day) => {
						return (
							<Card raised key={day.reviewid}>
								<CardContent>
									Editing: {dayDate}
									{day.answers.map((answer, i) => {
										return (
											<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
												checked={answer.promptAnswer} color="primary" /></p>
										)
									})}
									Rating: <Rating initialRating={day.rating}
										emptySymbol={<StarBorder />}
										fullSymbol={<Star />}
										start={0} stop={5} />
									<br></br><br></br>

									Notes: <TextField
										defaultValue={day.notes}
										id="standard-multiline-static"
										//label="Notes:"
										multiline rowsMax="3"
										placeholder="notes"
										margin="normal" />
								</CardContent>
								<CardActions>
									<Button variant="outlined" color="primary" onClick={this.handleEdit}>Cancel Edit</Button>
									<Button variant="outlined" color="secondary" onClick={() => this.handleDelete(day.reviewid)}>Delete Day</Button>
									<Button variant="outlined" color="primary" onClick={this.handleEdit}>Save Changes</Button>
								</CardActions>
							</Card>
						)
					})}
				</>//end isEditable
				:
				<>
					{this.props.single.map((day) => {
						return (
							<Card raised key={day.reviewid}>
								<CardContent>
									Date: {dayDate}
									{day.answers.map((answer, i) => {
										return (
											<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
												checked={answer.promptAnswer} color="primary" disabled /></p>
										)
									})}
									Rating: <Rating initialRating={day.rating}
										emptySymbol={<StarBorder />}
										fullSymbol={<Star />}
										start={0} stop={5} readonly />
									<br></br><br></br>
									Notes: {day.notes}
								</CardContent>
								<CardActions>
									<Button variant="outlined" color="primary" onClick={this.handleEdit}>Edit Day</Button>
									<Button variant="outlined" color="secondary" onClick={() => this.handleDelete(day.reviewid)}>Delete Day</Button>
								</CardActions>
							</Card>
						)
					})}
				</>//end isNOTeditable
				}
				{/* end ternary statment for conditional rendering if editable or not  */}
			
			</>
		)
	}
}

const mapStateToProps = state => ({
	single: state.single,
	prompt: state.prompt,
	review: state.review
});

export default connect(mapStateToProps)(SingleDay);
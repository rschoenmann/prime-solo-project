import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, TextField} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import moment from 'moment';
import Rating from 'react-rating';
import Swal from 'sweetalert2';

class SingleDay extends Component{

	state = {
		dayEditable: false,
		rating: this.props.single.rating,
		notes: this.props.single.notes,
		// answers: [
		// 	{id: 1, answer: false},
		// 	{id: 1, answer: false},
		// 	{id: 1, answer: false},
		// 	{id: 1, answer: false},
		// 	{id: 1, answer: false}
		// ]
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_SINGLE_DAY', payload: this.props.match.params.id});
		this.props.dispatch({type: 'FETCH_PROMPT'})
	}

	handleCheck = (promptid) => {
		console.log('edit promptid', promptid)
	};//end handleCheck

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

	handleNotes = (event) => {
		console.log('edit day notes:', event.target.value)
	};//end handleNotes

	handleRating = (value) =>{
		console.log('edit day rating:', value)
	};//end handleRating

	saveEdit = () => {
		this.handleEdit();
		Swal.fire({
			type: 'success',
			title: 'Thanks!',
			text: 'Your changes have been saved',
		});
	};//end saveEdit


	render(){
		let dayDate = moment(this.props.single.date).format('dddd, MMMM Do YYYY');
		console.log('single day state:', this.state)
		return(
			<>
				{this.state.dayEditable ?
				<>
					{this.props.single.map((day) => {
						return (
							<Card raised key={day.reviewid}>
								<CardContent>
									Editing: {dayDate}
									{day.answers.map((answer) => {
										return (
											<p key={answer.promptId}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
												onChange={() => this.handleCheck(answer.promptId)}
												checked={answer.promptAnswer} color="primary" /></p>
										)
									})}
									Rating: <Rating initialRating={day.rating}
										emptySymbol={<StarBorder />}
										fullSymbol={<Star />}
										start={0} stop={5} 
										onClick={this.handleRating}/>
									<br></br><br></br>

									Notes: <TextField
										onChange={this.handleNotes}
										defaultValue={day.notes}
										id="standard-multiline-static"
										multiline rowsMax="3"
										placeholder="notes"
										margin="normal" />
								</CardContent>
								<CardActions>
									<Button variant="outlined" color="primary" onClick={this.handleEdit}>Cancel Edit</Button>
									<Button variant="outlined" color="secondary" onClick={() => this.handleDelete(day.reviewid)}>Delete Day</Button>
									<Button variant="outlined" color="primary" onClick={this.saveEdit}>Save Changes</Button>
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
											<p key={answer.promptId}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
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
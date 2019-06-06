import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import moment from 'moment';
import Rating from 'react-rating';
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';

class SingleDay extends Component{

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_SINGLE_DAY', payload: this.props.match.params.id})
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
		console.log('EDIT')
	};//end handleEdit


	render(){
		return(
			<>
			{this.props.single.map((day) => {
				let theDate = moment(day.date).format('dddd, MMMM Do YYYY')
				return(
					<Card raised key={day.reviewid}>
						<CardContent>
							Date: {theDate} ID: {day.reviewid}
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
			</>
		)
	}
}

const mapStateToProps = state => ({
	single: state.single
});

export default connect(mapStateToProps)(SingleDay);
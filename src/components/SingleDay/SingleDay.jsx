import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, TextField, Grid, Typography, Paper} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import Moment from 'react-moment';
import Rating from 'react-rating';
import Swal from 'sweetalert2';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		margin: '20px',
	},
	head: {
		marginTop: '25px',
		marginBottom: '30px',
	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		width: '75%',
		padding: '20px',
	},
	paper: {
		padding: '15px',
		width: '50%',
		height: '150px',
		marginTop: '20px',
	},
	icon: {
		color: 'rgba(0,0,0,0.54)',
		borderColor: '#737373',
	}

};
class SingleDay extends Component{

	state = {
		dayEditable: false,
		notes: ''
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
				this.props.history.push('/home')
			}//end if statement
		});
	};//end handleDelete

	handleEdit = () => {
		this.setState({
			dayEditable: !this.state.dayEditable
		})
	};//end handleEdit

	handleNotes = (event) => {
		console.log('edit day notes:', event.target.value);
		this.setState({
			notes: event.target.value
		})
	};//end handleNotes

	saveEdit = () => {
		this.handleEdit();
		Swal.fire({
			type: 'success',
			title: 'Thanks!',
			text: 'Your changes have been saved',
		});
		this.props.dispatch({type: 'EDIT_DAY', payload: {id: this.props.match.params.id, notes: this.state.notes}})
		this.props.history.push('/home')
	};//end saveEdit


	render(){
		const {classes} = this.props;
		let today = <Moment local format="MMMM Do YYYY"></Moment>;
		console.log('single day state:', this.state)
		return(
			<Grid>
				{this.state.dayEditable ?
				<>
					{this.props.single.map((day) => {
						return (
							<Card raised key={day.reviewid} className={classes.card}>
								<CardContent>
									<Typography className={classes.head} variant="h5">Editing: {today}</Typography>
									{day.answers.map((answer, i) => {
										return (
											<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
												onChange={() => this.handleCheck(i)}
												checked={answer.promptAnswer} color="primary" disabled/></p>
										)
									})}
									<br></br>

									Rating: <Rating initialRating={day.rating}
										emptySymbol={<StarBorder className={classes.icon}/>}
										fullSymbol={<Star className={classes.icon}/>}
										start={0} stop={5} readonly/>
									<br></br><br></br>

									<Paper className={classes.paper}>Notes: <TextField
										onChange={this.handleNotes}
										defaultValue={day.notes}
										id="standard-multiline-static"
										multiline rowsMax="3"
										placeholder="notes"
										margin="normal" />
									</Paper>
										<br></br>

								</CardContent>
								<CardActions>
									<Button variant="outlined" color="primary" onClick={this.handleEdit}>Cancel Edit</Button>
									<Button variant="contained" color="secondary" onClick={() => this.handleDelete(day.reviewid)}>Delete Day</Button>
									<Button variant="contained" color="primary" onClick={this.saveEdit}>Save Changes</Button>
								</CardActions>
							</Card>
						)
					})}
				</>//end isEditable
				:
				<>
					{this.props.single.map((day) => {
						return (
							<Card raised key={day.reviewid} className={classes.card}>
								<CardContent>
									<Typography className={classes.head} variant="h5">Date: {today}</Typography>
									{day.answers.map((answer, i) => {
										return (
											<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
												checked={answer.promptAnswer} color="primary" disabled /></p>
										)
									})}
									<br></br>

									Rating: <Rating initialRating={day.rating}
										emptySymbol={<StarBorder className={classes.icon}/>}
										fullSymbol={<Star className={classes.icon}/>}
										start={0} stop={5} readonly />
									<br></br><br></br>

									<Paper className={classes.paper}>Notes: {day.notes}</Paper>
									<br></br>

								</CardContent>
								<CardActions>
									<Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Day</Button>
									<Button variant="contained" color="secondary" onClick={() => this.handleDelete(day.reviewid)}>Delete Day</Button>
								</CardActions>
							</Card>
						)
					})}
				</>//end isNOTeditable
				}
				{/* end ternary statment for conditional rendering if editable or not  */}
			
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	single: state.single,
	prompt: state.prompt,
	review: state.review
});

export default withStyles(styles)(connect(mapStateToProps)(SingleDay));
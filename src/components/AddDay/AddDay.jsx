import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, Checkbox, TextField, Paper, Button, Grid, Typography} from '@material-ui/core';
import StarRating from '../StarRating/StarRating';
import Moment from 'react-moment';
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

};

class AddDay extends Component {

	componentDidMount(){
		//fetch prompts to populate questions
		this.props.dispatch({type: 'FETCH_PROMPT'})
		this.props.dispatch({type: 'SET_REVIEW_DATE'})
	};//end componentDidMount

	handleCheck = (promptid) => {
		//console.log('promptid', promptid)
		//promptid passed in from anonymous function from checkbox onChange
		//will use that to determine which key to change in reviewReducer state
		this.props.dispatch({type: 'SET_REVIEW_CHECK', payload: promptid})
	};//end handleCheck

	handleNotes = (event) => {
		//console.log('event.target.value:', event.target.value)
		//dispatching event.target.value to store in reviewReducer state
		this.props.dispatch({type: 'SET_REVIEW_NOTES', payload: event.target.value})
	};//end handleNotes

	handleSubmit = () => {
		//only allow submission of day if user has filled out starRating
		if(this.props.review.value !== 0){
			this.props.dispatch({type: 'ADD_REVIEW', payload: this.props.review});
			Swal.fire({
				type: 'success',
				title: 'Thanks!',
				text: 'Day has been added',
			});
			this.props.history.push('/home')
		}else{
			alert('DO THE RATING!')
		}
	};//end handleSubmit

	render(){
		const {classes} = this.props;
		let today = <Moment local format="MMMM Do YYYY"></Moment>;
		return(
				<Grid>
				<Card className={classes.card}>
					<CardContent>
						<Typography className={classes.head} variant="h5">Entering Data For: {today}</Typography>
						{this.props.prompt.map((prompt) => {
							// isChecked = prompt.id;
							const id = prompt.id
							return (
								<p key={prompt.id}>{prompt.prompt}: <Checkbox value={prompt.id}
									onChange={() => this.handleCheck(prompt.id)}
									checked={this.props.review[id]} color="primary" /></p>
								
							)
						})}

						<br></br>
						<p>How would you rate today overall?</p>
						<StarRating />

						<br></br><br></br>

						<Paper className={classes.paper}>Any notes to add?: <TextField
										onChange={this.handleNotes}
										id="standard-multiline-static"
										multiline rowsMax="3"
										placeholder="(optional)"
										margin="normal" />
						</Paper>
						<br></br>

					</CardContent>
					<CardActions>
						<Button variant="contained" color="primary" onClick={this.handleSubmit}>
							Submit Day</Button>
					</CardActions>
				</Card>
			</Grid>

		)
	}
}

const mapStateToProps = state => ({
	prompt: state.prompt,
	review: state.review
});

export default withStyles(styles)(connect(mapStateToProps)(AddDay));
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, Checkbox, TextField, Paper, Button} from '@material-ui/core';
import StarRating from '../StarRating/StarRating';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import {withStyles} from '@material-ui/core/styles';


const styles = {
	root: {
		width: '350px',
		height: '200px',
	}
}

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
		let today = <Moment local format="MM/DD/YYYY"></Moment>;
		return(
			<>
				<Card>
					<CardContent>
						Entering Data For: {today}
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

						<Paper className={this.props.classes.root}>
							<TextField
								onChange={this.handleNotes}
								id="standard-multiline-static"
								label="Any notes to add? (optional)"
								multiline rowsMax="3"
								placeholder="notes"
								margin="normal" /></Paper>
								<br></br>
					</CardContent>
					<CardActions>
						<Button variant="contained" color="primary" onClick={this.handleSubmit}>
							Submit Day</Button>
					</CardActions>
				</Card>



			
			</>
		)
	}
}

const mapStateToProps = state => ({
	prompt: state.prompt,
	review: state.review
});

export default withStyles(styles)(connect(mapStateToProps)(AddDay));
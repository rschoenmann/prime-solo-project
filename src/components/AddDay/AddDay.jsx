import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, TextField, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText, Button} from '@material-ui/core';
import StarRating from '../StarRating/StarRating';

class AddDay extends Component {

	componentDidMount(){
		//fetch prompts to populate questions
		this.props.dispatch({type: 'FETCH_PROMPT'})
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

	render(){
		console.log('this.state', this.state);
		return(
			<FormControl>
				<FormLabel>ENTER DATA</FormLabel>
				<br></br>
				<FormGroup>
					<TextField
						id="date"
						label="Date"
						type="date"
						defaultValue="2019-05-28"
						InputLabelProps={{shrink: true}} />
					<br></br><br></br>
					{this.props.prompt.map((prompt) => {
						// isChecked = prompt.id;
						const id = prompt.id
						return(
								<FormControlLabel key={prompt.id} control={
									<Checkbox onChange={() => this.handleCheck(prompt.id)} value={prompt.id} checked={this.props.review[id]} color="primary"/>}
									label={prompt.prompt} />
							)
						})}

				<StarRating />

				<TextField
					onChange={this.handleNotes}
					id="standard-multiline-static"
					label="Any notes to add? (optional)"
					multiline rowsMax="3"
					placeholder="notes"
					margin="normal"/>
				</FormGroup>
				<FormHelperText>Be careful</FormHelperText>

				<Button variant="contained" color="primary">
					Submit Day</Button>

				<pre>{JSON.stringify(this.props.review)}</pre>
			</FormControl>
		)
	}
}

const mapStateToProps = state => ({
	prompt: state.prompt,
	review: state.review
});

export default connect(mapStateToProps)(AddDay);
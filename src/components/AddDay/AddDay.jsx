import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, TextField, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText} from '@material-ui/core';
import StarRating from '../StarRating/StarRating';

class AddDay extends Component {

	state = {
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		value: 0,
		notes: ''
	}

	componentDidMount(){
		//fetch prompts to populate questions
		this.props.dispatch({type: 'FETCH_PROMPT'})
	};//end componentDidMount

	handleCheck = (promptid) => {
		//promptid passed in from anonymous function from checkbox onChange
		//will use that to determine which key to change in state
		console.log('promptid', promptid)
		this.setState({
			[promptid]: !this.state[promptid]
		})
		// console.log('this.state.promptid', this.state)
	};//end handleCheck

	handleNotes = (event) => {
		console.log('event.target.value:', event.target.value)
		this.setState({
			notes: event.target.value
		})
	};//end handleNotes

	ratingChange = (starValue) => {
		console.log('ratingChange value', starValue);
		this.setState({
			value: starValue
		})
	};//end ratingChange

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
									<Checkbox onChange={() => this.handleCheck(prompt.id)} value={prompt.id} checked={this.state[id]} color="primary"/>}
									label={prompt.prompt} />
							)
						})}

				<StarRating onChange={this.ratingChange}/>

				<TextField
					onChange={this.handleNotes}
					id="standard-multiline-static"
					label="Any notes to add? (optional)"
					multiline rowsMax="3"
					placeholder="notes"
					fullWidth="false"
					margin="normal"/>
				</FormGroup>
				<FormHelperText>Be careful</FormHelperText>
			</FormControl>
		)
	}
}

const mapStateToProps = state => ({
	prompt: state.prompt,

});

export default connect(mapStateToProps)(AddDay);
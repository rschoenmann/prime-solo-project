import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, TextField, Button, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import Rating from 'material-ui-rating';

class AddDay extends Component {

	state = {
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		rating: 0,
		notes: ''
	}

	componentDidMount(){
		//fetch prompts to populate questions
		this.props.dispatch({type: 'FETCH_PROMPT'})
	}

	handleCheck = (promptid) => {
		//promptid passed in from anonymous function from checkbox onChange
		//will use that to determine which key to change in state
		console.log('promptid', promptid)
		this.setState({
			[promptid]: !this.state[promptid]
		})
		// console.log('this.state.promptid', this.state)
	};//end handleCheck

	render(){
		console.log('this.state', this.state);
		// set a variable for this.state.{prompt.id} in order to toggle isChecked
		let isChecked;
		return(
			<div>
					<FormControl>
						<FormLabel>ENTER DATA</FormLabel>
						<br></br>
						<FormGroup>
							<TextField
								id="date"
								label="Date"
								type="date"
								defaultValue="2019-05-28"
								InputLabelProps={{ shrink: true }} />
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
						<Rating 
							onChange={() => this.handleRating()} value={this.state.rating}/>
						<TextField
							id="standard-multiline-static"
							label="Any notes to add? (optional)"
							multiline rows="2"
							placeholder="notes"
							margin="normal"/>
						</FormGroup>
						<FormHelperText>Be careful</FormHelperText>
					</FormControl>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	prompt: state.prompt,

});

export default connect(mapStateToProps)(AddDay);
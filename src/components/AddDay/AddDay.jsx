import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, TextField, Button, FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText} from '@material-ui/core';

class AddDay extends Component {

	state = {
		check1: false,
		check2: false,
		check3: false,
		check4: false,
		check5: false,
	}

	componentDidMount(){
		//fetch prompts to populate questions
		this.props.dispatch({type: 'FETCH_PROMPT'})
	}

	handleCheck = (id) => {
		// this.setState({
		// 	...state,
		// 	[id]: !this.state
		// })
	}

	render(){
		console.log('this.state', this.state)
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
								return(
									<div key={prompt.id}>
										<FormControlLabel control={<Checkbox  
											onChange={this.handleCheck(prompt.id)} value={prompt.id} color="primary"/>}
											label={prompt.prompt} />
									</div>
								)
							})}
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
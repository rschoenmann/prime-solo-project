import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, TextField, Button} from '@material-ui/core';

class AddDay extends Component {

	componentDidMount(){
		//fetch prompts to populate questions
		this.props.dispatch({type: 'FETCH_PROMPT'})
	}

	render(){
		return(
			<div>
				<form>
					<TextField
						id="date"
						label="Select Date"
						type="date"
						defaultValue="2019-05-28"
						InputLabelProps={{shrink: true}}/>

						<div>
							{this.props.prompt.map((prompt) => {
								return(
									<div>
									<p>{prompt.prompt}</p>
									<Checkbox
										value="checkedB"
										color="primary"/>
									</div>
								)
							})}
						</div>



				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	prompt: state.prompt,

});

export default connect(mapStateToProps)(AddDay);
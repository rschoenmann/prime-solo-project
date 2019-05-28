import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddDay extends Component {
	render(){
		return(
			<p>Add a day!</p>
		)
	}
}

const mapStateToProps = state => ({
	state
});

export default connect(mapStateToProps)(AddDay);
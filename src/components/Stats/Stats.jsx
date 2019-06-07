import React, {Component} from 'react';
import {connect} from 'react-redux';

class Stats extends Component{
	render(){
		return(
			<h2>STATS :(</h2>
		)
	}
}

const mapStateToProps = state => ({
	state
});

export default connect(mapStateToProps)(Stats);
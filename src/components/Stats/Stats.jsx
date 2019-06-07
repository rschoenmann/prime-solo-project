import React, {Component} from 'react';
import {connect} from 'react-redux';

class Stats extends Component{
	render(){
		return(
			<p>STATS</p>
		)
	}
}

const mapStateToProps = state => ({
	state
});

export default connect(mapStateToProps)(Stats);
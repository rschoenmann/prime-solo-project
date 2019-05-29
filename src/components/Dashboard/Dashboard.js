import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
	render() {
		return (
			<p>Dashboard</p>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<p>Dashboard</p>
				<button>Add a new day</button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
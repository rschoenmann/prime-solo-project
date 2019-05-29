import React from 'react';
import {connect} from 'react-redux';


// this could also be written with destructuring parameters as:
// const Profile = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const Profile = (props) => (
	<div>
		<h2>{props.user.name}'s Profile</h2>
		<p>Username: {props.user.username}</p>
		<p>Name: {props.user.name}</p>
		<p>Default Color Gradient: {props.user.gradient_id}</p>
		<p>GRADIENT EXAMPLE HERE</p>

		<button >Edit Profile</button>
	
	</div>
);

const mapStateToProps = state => ({
	user: state.user,
});

export default connect(mapStateToProps)(Profile);
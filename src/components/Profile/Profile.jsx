import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputAdornment, Button, FormControl, InputLabel, TextField, MenuItem, Select, OutlinedInput} from '@material-ui/core';

class Profile extends Component {

	state ={
		profileEditable: false,
		username: this.props.user.username,
		name: this.props.user.name,
		gradient_id: this.props.user.gradient_id
	}

	editProfile = () => {
		//on edit button click, set profileEditable state to true to trigger conditionally
		//rendered display to allow profile updates to be made
		this.setState({
			profileEditable: true
		})
	};//end editProfile

	handleInputChange = propertyName => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};//end handleInputChange

	render(){
		return(
			<div>
				<h2>{this.props.user.name}'s Profile
						{/* ternary statement to conditionally render page based on if user is editing profile or not */}
					    {this.state.profileEditable ?
						<> <input type="text" placeholder="enter username" onChange={this.handleChange} /><br></br><button onClick={this.saveUsername}>Save Username</button></> :
						<><p>Username: {this.props.user.username}</p>
							<p>What should we call you: {this.props.user.name}</p>
							<p>Default Color Gradient: {this.props.user.gradient_id}</p>
							<p>GRADIENT EXAMPLE HERE</p>
							<Button variant="contained" color="primary" onClick={this.editProfile}>Edit Profile</Button>  </>
					}</h2>
						<FormControl variant="outlined">
							<InputLabel htmlFor="username">
							Username:</InputLabel>
						      <TextField
								    id="outlined-name" label="username"
									type="username" value={this.state.username}
								    onChange={this.handleInputChange('username')}
								    margin="normal" variant="outlined"/>
							<InputLabel htmlFor="name">
							Username:</InputLabel>
								<TextField
								    id="outlined-name" label="name"
									type="name" value={this.state.name}
								    onChange={this.handleInputChange('name')}
								    margin="normal" variant="outlined"/>
							<InputLabel htmlFor="gradient_id">
							Color Gradient</InputLabel>
					<TextField select
						variant="filled" label="gradient_id"
						value={this.state.gradient_id}
						onChange={this.handleInputChange('gradient_id')}
						InputProps={{startAdornment: <InputAdornment position="start">gradient</InputAdornment>,
						}}>
						{ranges.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
								// <Select value={this.state.gradient_id}
								// onChange={this.handleInputChange('gradient_id')}
								// input={<OutlinedInput labelWidth={18} name="gradient_id" id="gradient_id" />}>
								// <MenuItem value=""><em>None</em></MenuItem>
								// <MenuItem value={10}>Ten</MenuItem>
								// <MenuItem value={20}>Twenty</MenuItem>
								// <MenuItem value={30}>Thirty</MenuItem>
								// </Select>
						</FormControl>
				
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
	// gradient: state.gradient
});

export default connect(mapStateToProps)(Profile);
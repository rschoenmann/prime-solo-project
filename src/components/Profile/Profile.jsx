import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import Swal from 'sweetalert2';
import './Profile.css';

class Profile extends Component {

	state = {
		profileEditable: false,
		username: this.props.user.username,
		name: this.props.user.name,
		gradient_id: 1
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_GRADIENT'})
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

	saveChanges = () =>{
		console.log('saveChanges');
		this.setState({
			profileEditable: false
		});
		Swal.fire({
			type: 'success',
			title: 'Thanks!',
			text: 'Your profile has been updated',
		});
		this.props.dispatch({type: 'UPDATE_USER', payload: this.state})
	};//end saveChanges

	render(){
		console.log('is profile editable?', this.state.profileEditable)
		return(
			<div>
				<h2>{this.props.user.name}'s Profile</h2>
						{/* ternary statement to conditionally render page based on if user is editing profile or not */}
					    {this.state.profileEditable ?
						<><form>
							<label htmlFor="username">
              				Username:
              					<input type="text" name="username"
                				value={this.state.username}
                				onChange={this.handleInputChange('username')}/></label>
							<br></br>

							<label htmlFor="name">
              				What should we call you?:
              					<input type="text" name="name"
                				value={this.state.name}
								onChange={this.handleInputChange('name')} /></label>
							<br></br>

							
							<label htmlFor="gradient_id">
							Default color gradient:
								<select value={this.props.user.gradient_id} onChange={this.handleInputChange('gradient_id')}>
									<option value={0}>No preference</option>
									<option value={1} >Red to Blue</option>
									<option value={2} >Blue to Green</option>
									<option value={3} >Yellow to Purple</option>
								</select></label>
							<br></br>

							<div className="gradientExample">
								{this.props.gradient.map((gradient) =>{
									return(
										<>
										<p>COLORS</p>
										<ul key={gradient.id}>
											{gradient.colors.map((color) => {
												return(
													<li key={color.value} className="gradientDiv" style={{color: `${color.color}`}}>{color.color}</li>
												)
											})}
										</ul>
										</>
									)
								})}
							</div>

							<p>GRADIENT EXAMPLE HERE</p>

							<Button variant="contained" color="primary" onClick={this.saveChanges}>Save Changes</Button> 
						</form></>:
						<><p>Username: {this.props.user.username}</p>
							<p>What should we call you: {this.props.user.name}</p>
							<p>Default Color Gradient: {this.props.user.gradient_id}</p>
							<p>GRADIENT EXAMPLE HERE</p>
							<Button variant="contained" color="primary" onClick={this.editProfile}>Edit Profile</Button>

							<div className="gradientExample">
								{this.props.gradient.map((gradient) => {
									return (
										<>
											<p>COLORS</p>
											<ul key={gradient.id}>
												{gradient.colors.map((color) => {
													return (
														<li key={color.value} className="gradientDiv" style={{ color: `${color.color}` }}>{color.color}</li>
													)
												})}
											</ul>
										</>
									)
								})}
							</div>
					</>	
					}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
	gradient: state.gradient
});

export default connect(mapStateToProps)(Profile);
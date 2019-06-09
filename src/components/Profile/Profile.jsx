import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import Swal from 'sweetalert2';
import './Profile.css';

class Profile extends Component {

	state = {
		profileEditable: false,
		username: this.props.user.username,
		gradient_id: this.props.user.gradient_id
	}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_GRADIENT'})
	}

	cancelEdit = () => {
		this.setState({
			profileEditable: false
		});
	}

	editProfile = () => {
		//on edit button click, set profileEditable state to true to trigger conditionally
		//rendered display to allow profile updates to be made
		this.setState({
			profileEditable: true
		})
	};//end editProfile

	divClick = (id) => {
		console.log('div click!', id)
		this.setState({
			gradient_id: id
		})
	}

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
		console.log('profile state', this.state)
		let gradientDisplay;
		return(
			<div>
				<h2>{this.props.user.username}'s Profile</h2>
						{/* ternary statement to conditionally render page based on if user is editing profile or not */}
					    {this.state.profileEditable ?
						<>
							{this.props.gradient.map((aGradient) => {
								if (aGradient.gradientid === this.props.user.gradient_id) {
									return (
									<form>
										<label htmlFor="username">
		              						Username:
		              						<input type="text" name="username"
		                					value={this.state.username}
		                					onChange={this.handleInputChange('username')}/></label>
										<br></br>

										<label htmlFor="gradient_id">
											Default color gradient: {aGradient.name} -  
												{aGradient.colors.map((color, i) => {
													return (
														<div key={i} className="gradientDiv" style={{backgroundColor: `${color.color}`}}></div>
													)
												})}</label>
										<br></br><br></br>

										<p>Select new color gradient:</p>
											{this.props.gradient.map((aGradient) => {
												let id = `${aGradient.gradientid}`
												return(
													<div key={aGradient.gradientid} className="selectGradient" 
														value={this.state.gradient_id} onClick={() => this.divClick(id)}>
														<p>{aGradient.name}:</p>
														{aGradient.colors.map((color, i) => {
															return(
																<div key={i} className="gradientDiv" style={{backgroundColor: `${color.color}`}}></div>
															)
														})}
													</div>
												)
											})}
											<br></br>

									<Button variant="contained" color="primary" onClick={this.cancelEdit}>Cancel</Button>
									<Button variant="contained" color="primary" onClick={this.saveChanges}>Save Changes</Button> 
								</form>
									)
								}
							})}
								
						</>
						:
						<>
							{this.props.gradient.map((aGradient) => {
								if(aGradient.gradientid === this.props.user.gradient_id){
									return(
										<div key={aGradient.gradientid}>
											<p>Username: {this.props.user.username}</p>
											<p>Default Color Gradient: {aGradient.name}</p>
										{aGradient.colors.map((color, i) => {
											return(
												<div key={i} className="gradientDiv" style={{backgroundColor: `${color.color}`}}></div>
											)
										})}
										</div>
									)
								}
							})}
							<br></br>
							<Button variant="contained" color="primary" onClick={this.editProfile}>Edit Profile</Button>

						<pre>{JSON.stringify(this.props.user)}</pre>
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
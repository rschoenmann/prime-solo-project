import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Select, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import './Profile.css';

const styles = {
	menuProps: {
		maxHeight: 48 * 4.5 + 8,
		width: 200,
	},
	gradientDiv: {
		width: '100px',
		height: '50px',
		border: '2px solid black',
		display: 'inlineBlock',
	}
};

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

	selectGradient = (event) => {
		console.log('div click!', event.target.value)
		this.setState({
			gradient_id: event.target.value
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
		// console.log('is profile editable?', this.state.profileEditable)
		// console.log('profile state', this.state)
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

										<label htmlFor="gradientSelect">
											Default Gradient:
										<Select onChange={this.selectGradient} className={this.props.classes.menuProps}
													inputProps={{name: 'gradient', id: 'age-simple', }} value={this.state.gradient_id} style={{color: 'white', backgroundImage: `linear-gradient(to right, ${aGradient.colors[0].color}, ${aGradient.colors[4].color}`}}>
											<MenuItem value={this.state.gradient_id} style={{color: 'white', backgroundImage: `linear-gradient(to right, ${aGradient.colors[0].color}, ${aGradient.colors[4].color}`}}>Current: {aGradient.name}</MenuItem>
												{this.props.gradient.map((gradient) => {
													return (
														<MenuItem key={gradient.gradientid} className="gradientOption" value={gradient.gradientid} style={{color: 'white', backgroundImage: `linear-gradient(to right, ${gradient.colors[0].color}, ${gradient.colors[4].color}`}}>{gradient.name}</MenuItem>
													)
												})}
											</Select></label>
										<br></br><br></br>


									
											<br></br>

									<Button variant="contained" color="primary" onClick={this.cancelEdit}>Cancel</Button>
									<Button variant="contained" color="primary" onClick={this.saveChanges}>Save Changes</Button> 
								</form>
									)
								}else{
									return null
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
											<div className={this.props.classes.gradientDiv} style={{color: 'white', backgroundImage: `linear-gradient(to right, ${aGradient.colors[0].color}, ${aGradient.colors[4].color}`}}></div>
										</div>
									)
								}else{
									return null
								}
							})}
							<br></br>
							<Button variant="contained" color="primary" onClick={this.editProfile}>Edit Profile</Button>
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

export default withStyles(styles)(connect(mapStateToProps)(Profile));
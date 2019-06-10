import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select, MenuItem, Button, Card, Grid, Typography, FormControl, TextField} from '@material-ui/core';
import {withStyles, ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#81d4fa' }
  }
})

const styles = {
  root: {
    backgroundColor: '#424242',
    paddingBottom: '75px'
  },
  submitButton: {
    marginLeft: '40%',
    marginBottom: '25px',
    marginTop: '25px'
  }, 
  menuProps: {
    maxHeight: 48 * 4.5 + 8,
    width: 200,
  },
}

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    gradient_id: 0,
  };

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_GRADIENT'})
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          gradient: this.state.gradient_id
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  selectGradient = (event) => {
    console.log('register gradient select', event.target.value);
    this.setState({
      gradient_id: event.target.value
    })
  }

  render() {
    const {classes}=this.props;
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser} className="registerForm">
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>

            <label htmlFor="gradientSelect">
              Select Default Gradient:
							<Select onChange={this.selectGradient} className={this.props.classes.menuProps} 
              inputProps={{name: 'gradient', id: 'age-simple',}} value={this.state.gradient_id}>
                {this.props.gradient.map((gradient) => {
                  return (
                    <MenuItem key={gradient.gradientid} className="gradientOption" value={gradient.gradientid} style={{ color: 'white', backgroundImage: `linear-gradient(to right, ${gradient.colors[0].color}, ${gradient.colors[4].color}` }}>{gradient.name}</MenuItem>
                  )
                })}
              </Select></label>
          
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>

        <Button variant="contained" color="primary" onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}>Login</Button>
        
          {/* <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button> */}
        
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  gradient: state.gradient,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));


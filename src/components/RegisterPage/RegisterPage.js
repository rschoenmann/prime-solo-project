import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {FormControl, InputLabel, Select, MenuItem, OutlinedInput} from '@material-ui/core';

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

  divClick = (id) => {
    console.log('register div click', id);
    this.setState({
      gradient_id: id
    })
  }

  render() {
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
            <p>Select default color gradient: {this.state.gradient_id}</p>
            {this.props.gradient.map((aGradient) => {
              let id = `${aGradient.gradientid}`
              return (
                <div key={aGradient.gradientid} className="selectGradient"
                  value={this.state.gradient_id} onClick={() => this.divClick(id)}>
                  <p>{aGradient.name}:</p>
                  {aGradient.colors.map((color, i) => {
                    return (
                      <div key={i} className="gradientDiv" style={{ backgroundColor: `${color.color}` }}></div>
                    )
                  })}
                </div>
              )
            })}
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
        
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        
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

export default connect(mapStateToProps)(RegisterPage);


import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/styles';
import {AppBar, Tab, Tabs, Grid} from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const styles = {
	root: {
    justify: 'center',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		marginLeft: '25px',
	},
	head: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	login: {
		marginTop: '20px',
    marginBottom: '15px',

	},
};

class NavBar extends Component{
  render(){
    const {classes} = this.props;
    return(
        <Grid className={classes.root}>
          <div className="nav">
            <Link to="/home">
              <h2 className="nav-title">Reflexive Reflection</h2>
              </Link>

        <AppBar position="static" color="default">
          <Tabs className="navRoot"
            indicatorColor="primary"
            centered
            textColor="primary"
            variant="fullWidth">
            
            {/* Show this link if they are logged in or not but call it 'Dashboard' 
            if they are logged in or 'Login / Register' if they are not */}
            <Tab label={this.props.user.id ? 'Dashboard' : 'Login / Register'} component={Link} to="/home" className="navLink" />
            {/* Show the link to the info page, AddDay, Profile and the logout button if the user is logged in */}
            {this.props.user.id && (
              <>
                <Tab label="Profile" component={Link} to="/profile" className="navLink" />
                <Tab label="Stats" component={Link} to="/stats" className="navLink" />
                <LogOutButton className="navLink" />
              </>
            )}
            {/* <Tab label="About" component={Link} to="/about" className="navLink" /> */}
            
          </Tabs>
        </AppBar>
        </div>
        </Grid>
    )
  }
};


// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(NavBar));
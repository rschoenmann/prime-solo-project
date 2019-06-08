import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Nav from 'react-bootstrap/Nav';
import './Nav.css';

const NavBar = (props) => (
  <div className="nav">
    <Nav variant="tabs" defaultActiveKey="/home">
		<Nav.Item>
			<Nav.Link href="/home" className="nav-link">
				<h2 className="nav-title">Reflexive Reflection</h2></Nav.Link>
		</Nav.Item>

    <div className="nav-right">
		<Nav.Item className="nav-link">
			{/* Show this link if they are logged in or not,
		    but call this link 'Dashboard' if they are logged in,
		    and call this link 'Login / Register' if they are not */}
			<Nav.Link href="/home" >
				{props.user.id ? 'Dashboard' : 'Login / Register'}</Nav.Link>
		</Nav.Item>

      {/* Show the link to the info page, AddDay, Profile and the logout button if the user is logged in */}
      {props.user.id && (
        <>
			<Nav.Item className="nav-link">
				<Nav.Link href="/profile">
					Profile</Nav.Link>
			</Nav.Item>
			<Nav.Item className="nav-link">
				<Nav.Link href="/stats">
					Stats</Nav.Link>
			</Nav.Item>
			<Nav.Item className="nav-link">
				<Nav.Link href="/addDay">
					ADD DAY</Nav.Link>
			</Nav.Item>
          {/* <Link className="nav-link" to="/info">Info Page</Link> */}
		  <Nav.Item className="nav-link">
				<LogOutButton className="nav-link" />
		  </Nav.Item>
          
        </>
      )}
      {/* Always show this link since the about page is not protected */}
		<Nav.Item className="nav-link">
			<Nav.Link href="/about">
				About</Nav.Link>
		</Nav.Item>
    </div>
	</Nav>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBar);

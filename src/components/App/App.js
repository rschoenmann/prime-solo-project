import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import Dashboard from '../Dashboard/Dashboard';
import AddDay from '../AddDay/AddDay';
import Profile from '../Profile/Profile';
import SingleDay from '../SingleDay/SingleDay';
import Stats from '../Stats/Stats';

import './App.css';

const theme = createMuiTheme({
	palette: {
		primary: {main: '#2980b9'},
		secondary: {main: '#29b9ab'}
	}
})

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <div>
          <NavBar />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact path="/about"
              component={AboutPage}/>
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
            	exact path="/home"
            	component={Dashboard}/>

            <ProtectedRoute 
      				exact path="/addDay"
      				component={AddDay} />

      			<ProtectedRoute
      				exact path="/profile"
      				component={Profile} />

            <ProtectedRoute
              exact path="/singleDay/:id"
              component={SingleDay} />

            <ProtectedRoute
              exact path="/stats"
              component={Stats} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact path="/info"
              component={InfoPage}/>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
      </ThemeProvider>
  )}
}

export default connect()(App);

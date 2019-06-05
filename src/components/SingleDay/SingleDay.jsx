import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import moment from 'moment';
import Rating from 'react-rating';
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';

class SingleDay extends Component{
	render(){
		return(
			<>
			
			</>
		)
	}
}

const mapStateToProps = state => ({
	day: state.day
});

export default connect(mapStateToProps)(SingleDay);
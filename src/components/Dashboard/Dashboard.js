import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, Modal, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Dashboard.css';
import moment from 'moment';
import Calendar from 'react-calendar';
import Rating from 'react-rating';
import SingleDay from '../SingleDay/SingleDay';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';

class Dashboard extends Component {

	state = {
			open: false,
			startDate: '',
			endDate: ''
		}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_DAY'});
		//getDates gets today's date and the date a month ago in order to set initial start and end dates for Heatmap Calendar
		this.getDates();
	};//end componentDidMount

	getDates = () => {
		let currentDate = moment().format('YYYY-MM-DD');
		let monthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
		this.setState({
			startDate: monthAgo,
			endDate: currentDate
		});
		this.props.dispatch({type: 'FETCH_DATES', payload: {dateRange: [monthAgo, currentDate]}})
	};//end getNow

	dateChange = (value) => {
		console.log('dateChange:', value);
		this.setState({
			startDate: moment(value[0]).format('YYYY-MM-DD'),
			endDate: moment(value[1]).format('YYYY-MM-DD')
		});
		this.props.dispatch({type: 'FETCH_DATES', payload: {dateRange: value}});
	};//end dateChange

	handleAdd = () => {
		this.props.history.push('/addDay')
	};//end handleAdd

	handleClickOpen = (value) => {
		this.setState({
			open: true
		})
	};//end handleClickOpen

	handleClose = () => {
		this.setState({
			open: false
		})
	};//end handleClose

	handleDateClick = (value) => {
		console.log('handleDate click value:', value);
		let formatDate = moment(value.date).format('dddd, MMMM Do YYYY');
		Swal.fire({
			title: `${formatDate}`,
			html:
				`<Card raised>
						  <CardContent>
							ID: ${value.reviewid}
								${value.answers}.map((answer, i) => {
									return (
										<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
											checked={answer.promptAnswer} color="primary" disabled /></p>
									)
								})}`,
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
			confirmButtonText:
				'<i class="fa fa-thumbs-up"></i> Great!',
			confirmButtonAriaLabel: 'Thumbs up, great!',
			cancelButtonText:
				'<i class="fa fa-thumbs-down"></i>',
			cancelButtonAriaLabel: 'Thumbs down',
		})
	};//end handleDateClick

	handleDelete = (dayid) => {
		console.log('DELETE id:', dayid)
		Swal.fire({
		  title: 'Are you sure you want to delete this day?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
			this.props.dispatch({type: 'DELETE_DAY', payload: dayid})
		    Swal.fire(
		      'Deleted!',
		      'Day has been deleted.',
		      'success')
		  }//end if statement
		});
	};//end handleDelete

	handleEdit = () => {
		console.log('EDIT')
	};//end handleEdit

	render() {
		return (
			<div>
				<h2>Dashboard!</h2>
				
				<Button variant="contained" color="primary" onClick={this.handleAdd}>Add Rating For Today</Button>
				<br></br><br></br>
				<p>Select date range to view:</p>
				<DateRangePicker onChange={this.dateChange}
					value={[new Date(), new Date()]} />
				
				<CalendarHeatmap
					horizontal={false}
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					values={this.props.dates} 
					classForValue={(value) => {
						if (!value) {return 'color-empty';}
						return `color-scale-${value.rating}`;}}
					tooltipDataAttrs={value => {
        				return {'data-tip': `Date: ${value.date} Rating: ${value.rating}/5`,};}}
        	showWeekdayLabels={true}
					weekdayLabels={['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']}
					onClick={this.handleClickOpen} />
      			<ReactTooltip />

				<Modal open={this.state.open} onClose={this.handleClose}>
					<SingleDay />

				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	day: state.day,
	dates: state.dates,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
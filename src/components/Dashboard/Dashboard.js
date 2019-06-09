import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, TextField} from '@material-ui/core';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Dashboard.css';
import moment from 'moment';
import DateRangePicker from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

class Dashboard extends Component {

	state = {
			startDate: '',
			endDate: '',
			focusedInput: '',
			gradient_id: this.props.user.gradient_id
			// dates: this.props.days
		}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_DAY'});
		this.props.dispatch({type: 'FETCH_GRADIENT'});
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

	handleDateClick = (value) => {
		if(!value){
			Swal.fire('Sorry, no entry for this day!')
		}else{
			this.props.history.push(`/singleDay/${value.reviewid}`)
		}
		
	};//end handleDateClick

	selectGradient = (event) => {
		console.log('gradient value', event.target.value)
		this.setState({
			gradient_id: event.target.value
		})
	};//end selectGradient

	render() {
		console.log('this.state dashboard', this.state)
		let addDayButton;
		let today = moment().format('YYYY-MM-DD');
		let monthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
		//check to see if there's an entry for today in the database already, if so, don't let user add another entry for today
		for(let i=0; i<this.props.day.length; i++){
			if (new Date(this.props.day[i].date).toISOString().substr(0, 10) === today.toISOString().substr(0, 10)){
				addDayButton = <Button variant="contained" >Rate Today</Button>
			} else {
				addDayButton = <Button variant="contained" color="primary" onClick={this.handleAdd}>Rate Today</Button>
			}
		}
		return (
			<div>
				<h2>Dashboard!</h2>
				
				{addDayButton}
				<br></br><br></br>
				
				<p>Select date range to view:</p>
				<TextField
					id="startDate"
					label="Start date"
					type="date"
					defaultValue={today}
					InputLabelProps={{shrink: true,}}/>

				<TextField
					id="endDate"
					label="End Date"
					type="date"
					defaultValue={monthAgo}
					InputLabelProps={{shrink: true,}}/>

				<label htmlFor="gradientSelect">
					Select a gradient:
				<select onChange={this.selectGradient}>
					{this.props.gradient.map((gradient) => {
						return(
							<option key={gradient.gradientid} value={gradient.gradientid}>{gradient.name}</option>
						)
					})}
					</select></label>
				
				<CalendarHeatmap
					horizontal={false}
					startDate={this.state.startDate}
					endDate={this.state.endDate}
					values={this.props.day} 
					classForValue={(value) => {
						if (!value) {return 'color-empty';}
						return `color-scale-${this.state.gradient_id}-${value.rating}`;}}
					showWeekdayLabels={true}
					weekdayLabels={['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']}
					onClick={this.handleDateClick}
					transformDayElement={(rect, value, i) => {
						const tooltip = (
							<Tooltip id="tooltip">{value ? moment(value.date).format('MMM Do') : ''}</Tooltip>
						);
						return (
							<OverlayTrigger placement="top" overlay={tooltip} key={i}>
								{rect}
							</OverlayTrigger>
						);
					}}/>
					<ReactTooltip/>
      			
			</div>
		)
	}
}

const mapStateToProps = state => ({
	day: state.day,
	dates: state.dates,
	gradient: state.gradient,
	user: state.user
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
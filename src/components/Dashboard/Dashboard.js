import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Dashboard.css';
import moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';

class Dashboard extends Component {

	state = {
			startDate: '',
			endDate: '',
			// dates: this.props.days
		}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_DAY'});
		//getDates gets today's date and the date a month ago in order to set initial start and end dates for Heatmap Calendar
		this.getDates();
		ReactTooltip.rebuild();
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
		console.log('handleDate click value:', value.reviewid);
		this.props.history.push(`/singleDay/${value.reviewid}`)
	};//end handleDateClick

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
					values={this.props.day} 
					classForValue={(value) => {
						if (!value) {return 'color-empty';}
						return `color-scale-${value.rating}`;}}
					tooltipDataAttrs={(value) => {return{'data-tooltip': 'Tooltip: ' + value }}}
        			showWeekdayLabels={true}
					weekdayLabels={['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']}
					onClick={this.handleDateClick}/>
      			<ReactTooltip />
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
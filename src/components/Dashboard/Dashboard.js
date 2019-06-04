import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Checkbox, Card, CardContent, CardActions, Button, TextField} from '@material-ui/core';
import {Star, StarBorder} from '@material-ui/icons';
import Rating from 'react-rating';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Dashboard.css';
import Moment from 'react-moment';
import Calendar from 'react-calendar';
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';

class Dashboard extends Component {

	state = {
			startDate: 'Today',
			endDate: '',
			dateRange: [],
			testDates: [{date: '2019-01-01', count: 4 }, {date: '2019-01-02', count: 3  }, {date: '2019-01-03', count: 2  }, {date: '2019-01-04', count: 3  },{date: '2019-01-05', count: 5 }, 
						{date: '2019-01-06', count: 3 }, {date: '2019-01-07', count: 2  }, {date: '2019-01-08', count: 4  }, {date: '2019-01-09', count: 4  },{date: '2019-01-10', count: 1 }, 
						{date: '2019-01-11', count: 4 }, {date: '2019-01-12', count: 5 }, {date: '2019-01-13', count: 2 }, {date: '2019-01-14', count: 3 }, ]
		}

	componentDidMount(){
		this.props.dispatch({type: 'FETCH_DAY'})
	};//end componentDidMount

	dateChange = (value) => {
		console.log('dateChange:', value);
		this.setState({
			...this.state,
			dateRange: value
		});
		this.props.dispatch({type: 'FETCH_DATES', payload: {dateRange: value}});
	};//end dateChange

	handleAdd = () => {
		this.props.history.push('/addDay')
	};//end handleAdd

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
		console.log('this.state.dateRange render:', this.state.dateRange)
		return (
			<div>
				<h2>Dashboard!</h2>
				
				<Button variant="contained" color="primary" onClick={this.handleAdd}>Add Rating For Today</Button>
				<br></br><br></br>
				<p>Select date range to view:</p>
				<Calendar selectRange={true} returnValue="range" onChange={this.dateChange}/>
				<CalendarHeatmap
					horizontal={false}
					startDate={new Date('2019-01-01')}
					endDate={new Date('2019-01-30')}
					values={this.state.testDates} 
					classForValue={(value) => {
						if (!value) {return 'color-empty';}
						return `color-scale-${value.count}`;}}
					tooltipDataAttrs={value => {
        				return {'data-tip': `${value.date} has rating of ${value.count}`,};}}
        			showWeekdayLabels={true}
					weekdayLabels={['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']}
        			onClick={value => alert(`Clicked on value with count: ${value.count}`)}/>
      			<ReactTooltip />
				{this.props.day.map((aDay) => {
					return(
						<div key={aDay.reviewid}>
						<Card raised>
						  <CardContent>
							Date: {aDay.date}  ID: {aDay.reviewid}
								{aDay.answers.map((answer, i) => {
									return (
										<p key={i}>{answer.promptText}: <Checkbox value={answer.promptAnswer}
											checked={answer.promptAnswer} color="primary" disabled /></p>
									)
								})}
							Rating: <Rating initialRating={aDay.rating}
								emptySymbol={<StarBorder />}
								fullSymbol={<Star />}
								start={0} stop={5} readonly />
								<br></br>
							Notes: {aDay.notes}
						  </CardContent>
						  <CardActions>
						    <Button variant="outlined" color="primary" onClick={this.handleEdit}>Edit Day</Button>
							<Button variant="outlined" color="secondary" onClick={() => this.handleDelete(aDay.reviewid)}>Delete Day</Button>
						  </CardActions>
						</Card>
						<br></br><br></br>
						</div>
					
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	day: state.day,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Dashboard);
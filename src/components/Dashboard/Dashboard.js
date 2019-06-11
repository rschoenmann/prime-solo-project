import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {Star, StarBorder} from '@material-ui/icons';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Dashboard.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import ReactTooltip from 'react-tooltip';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Rating from 'react-rating';

const styles = {
	root: {
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		marginLeft: '25px',
		width: '800px'
	},
	head: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	addDay: {
	
	},
	menuProps: {
		maxHeight: 48 * 4.5 + 8,
		width: 200,
		marginLeft: '5px',
		paddingLeft: '10px',
	},
	selects: {
		marginTop: '20px',

	},
	datePicker: {
		paddingLeft: '8px',
	},
	selectTypo: {
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	},
	star: {
		marginTop: '25px',
		marginRight: '100px',
		float: 'right'
	}

};

class Dashboard extends Component {

	state = {
			startDate: '',
			endDate: '',
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

	dateChange = propertyName => (event) => {
		console.log('dateChange:', event.target.value);
		this.setState({
			[propertyName]: event.target.value
		});
	};//end dateChange

	dateChangeEnd = propertyName => (event) => {
		this.setState({
			[propertyName]: event.target.value
		});
		this.dateChangeSubmit();
	}

	dateChangeSubmit = () => {
		console.log('datechange state:', this.state);
		this.props.dispatch({type: 'FETCH_DATES', payload: this.state});
	}

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
		//console.log('gradient value', event.target.value)
		this.setState({
			gradient_id: event.target.value
		})
	};//end selectGradient

	render() {
		const {classes} = this.props;
		console.log('this.state dashboard', this.state)
		let addDayButton;
		// let today = moment().format('YYYY-MM-DD');
		// let monthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
		let today = moment().format('YYYY-MM-DD');
		let monthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
		//check to see if there's an entry for today in the database already, if so, don't let user add another entry for today
		for(let i=0; i<this.props.day.length; i++){
			let theDate = new Date(this.props.day[i].date);
			let dateStringed = theDate.toISOString().substr(0, 10);
			let todayDate = new Date();
			let todayStringed = todayDate.toISOString().substr(0, 10);
			if (dateStringed === todayStringed){
				addDayButton = <Button variant="contained" className={classes.addDay}>Rate Today</Button>
			} else {
				addDayButton = <Button variant="contained" color="primary" onClick={this.handleAdd} className={classes.addDay}>Rate Today</Button>
			}
		}

		// (new Date(this.props.day[i].date).toISOString().substr(0, 10) === today.toISOString().substr(0, 10))
		return (
			
			<Grid className={classes.root}>
			<div>
				<Typography variant="h5" className={classes.head}>Welcome, {this.props.user.username}!</Typography>
				
				{addDayButton}
				<br></br><br></br>
				
				<p className={classes.selectTypo}>Select date range to view:</p>
				<TextField className={classes.datePicker}
					id="startDate"
					type="date"
					defaultValue={monthAgo}
					InputLabelProps={{shrink: true,}} 
					onChange={this.dateChange('startDate')}/>

				<TextField className={classes.datePicker} 
					id="endDate"
					type="date"
					defaultValue={today}
					InputLabelProps={{shrink: true,}}
					onChange={this.dateChangeEnd('endDate')}/>

				<FormControl>
					<FormControlLabel label="Select a gradient:" labelPlacement="start" control={
					<Select onChange={this.selectGradient} className={this.props.classes.menuProps}
						inputProps={{name: 'gradient',id: 'age-simple',}} value={this.state.gradient_id}>
					{this.props.gradient.map((gradient) => {
						return(
							<MenuItem key={gradient.gradientid} className="gradientOption" value={gradient.gradientid} style={{color: 'white', backgroundImage: `linear-gradient(to right, ${gradient.colors[0].color}, ${gradient.colors[4].color}`}}>{gradient.name}</MenuItem>
						)
					})}
					</Select>}/>	
				</FormControl>
				<br></br>

				{/* div 
				map gradient
				return (starIcon with gradient colors) */}

{/* 
			<Rating initialRating={5} className={classes.star}
				emptySymbol={<StarBorder className={classes.icon}/>}
				{this.props.gradient.map((aGradient) => {
					return(
						 <>
							{aGradient.colors.map((color, i) => { 
								return(
									fullSymbol={<Star className={classes.iconFull}/>}
									start={0} stop={5} readonly/>
								)
							)}}

						</>
					)
				})} */}
                 
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
			</Grid>
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
export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pie, Doughnut} from 'react-chartjs-2';
import moment from 'moment';
import {TextField, Button, MobileStepper, Grid, Paper, Typography, SwipeableViews} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		margin: '20px',
	},
	head: {
		marginTop: '25px',
		marginBottom: '30px',
	},
	fetchButton: {
		marginLeft: '10px',
	},
	selectTypo: {
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	},
	datePicker: {
		paddingLeft: '8px',
	},
	headingStats: {
		margin: 'auto',
		marginBottom: '10px',
	},
	heading: {
		marginTop: '50px',
	},
	statsDiv: {
		border: '2px solid #757575',
		backgroundColor: '#f2f2f2',
		margin: 'auto',
		marginTop: '75px',
		padding: '20px',
		width: '525px',
	},
	stepper: {
		margin: 'auto',
		width: '550px',
	},


};
class Stats extends Component{

	state = {
		startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
		endDate: moment().format('YYYY-MM-DD'),
		step: 0
	}

	componentDidMount(){
		this.props.dispatch({type: 'STATS_DATE_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}})
		this.props.dispatch({type: 'STATS_PROMPT_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}})
	}

	dateRange = propertyName => (event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};//end dateRange

	handleNext = () => {
		if(this.state.step + 1 > 4){
			this.setState({
           		...this.state,
            	step: 0
        })} else {
			this.setState({
				...this.state,
				step: this.state.step + 1
			})
		}
    };//end handleNext

    handleBack = () => {
		if(this.state.step -1 < 0){
			this.setState({
           		...this.state,
            	step: 4
        })} else {
			this.setState({
				...this.state,
				step: this.state.step - 1
			})
		}
    }

	promptStats = () => {
		let data = [];
		for (let i = 0; i < this.props.statsPrompt.length; i++) {
			data.push(this.props.statsPrompt[i].truecount, this.props.statsPrompt[i].falsecount)
		}
		console.log('stats data:', data);
		return data;
	};//end promptStats

	ratingStats = () => {
		let data = [];
			for(let i=0; i<this.props.stats.length; i++){
				data.push(this.props.stats[i].count)
			}
		console.log('stats data:', data);
		return data;
	};//end ratingStats

	submitDates = (event) => {
		event.preventDefault();
		this.props.dispatch({type: 'STATS_DATE_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}});
		this.props.dispatch({type: 'STATS_PROMPT_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}})
	};//end submitDates

	charts = () => {
		const {classes} = this.props;
		return [
			<div className={classes.statsDiv}>
				<Typography className={classes.headingStats}>How often did you get enough sleep?</Typography>
				<Doughnut data={{
					labels: ['Got enough!','Not enough'],
					datasets: [{
						data: ((this.props.statsPrompt.length) ? [this.props.statsPrompt[0].truecount, this.props.statsPrompt[0].falsecount] : ''),
						label: 'Prompt',
						backgroundColor: ['#1AB71D','#FF6384']}]}} />
			</div>,
			<div className={classes.statsDiv}>
				<Typography className={classes.headingStats}>How often did you drink enough water?</Typography>
				<Doughnut data={{
					labels: ['Drank enough!', 'Not enough'],
					datasets: [{
						data: ((this.props.statsPrompt.length) ? [this.props.statsPrompt[1].truecount, this.props.statsPrompt[1].falsecount] : ''),
						label: 'Prompt',
						backgroundColor: ['#1AB71D', '#FF6384']
					}]
				}} />
			</div>,
			<div className={classes.statsDiv}>
				<Typography className={classes.headingStats}>How often did you go outside?</Typography>
				<Doughnut data={{
					labels: ['Went outside!', `Didn't go outside`],
					datasets: [{
						data: ((this.props.statsPrompt.length) ? [this.props.statsPrompt[2].truecount, this.props.statsPrompt[2].falsecount] : ''),
						label: 'Prompt',
						backgroundColor: ['#1AB71D', '#FF6384']
					}]
				}} />
			</div>,
			<div className={classes.statsDiv}>
				<Typography className={classes.headingStats}>How often did you take your meds?</Typography>
				<Doughnut data={{
					labels: ['Took them!', `Didn't take them`],
					datasets: [{
						data: ((this.props.statsPrompt.length) ? [this.props.statsPrompt[3].truecount, this.props.statsPrompt[3].falsecount] : ''),
						label: 'Prompt',
						backgroundColor: ['#1AB71D', '#FF6384']
					}]
				}} />
			</div>,
			<div className={classes.statsDiv}>
				<Typography className={classes.headingStats}>How often did you talk to a friend?</Typography>
				<Doughnut data={{
					labels: ['Talked to someone!', `Didn't talk to someone`],
					datasets: [{
						data: ((this.props.statsPrompt.length) ? [this.props.statsPrompt[4].truecount, this.props.statsPrompt[4].falsecount] : ''),
						label: 'Prompt',
						backgroundColor: ['#1AB71D', '#FF6384']
					}]
				}} />
			</div>
		]
	}
	
	render(){
		// let today = new Date();
		// let monthAgo = today.setDate(today.getDate()-30);
		console.log('prompt stats', this.charts())
		const {classes} = this.props;
		return(
			<Grid className={classes.root}>
			<div>
				<Typography variant="h5" className={classes.head}>Stats</Typography>

				<p className={classes.selectTypo}>Select date range:</p>
				<form onSubmit={this.dateRange}>
					<TextField className={classes.datePicker}
						id="startDate"
						type="date"
						defaultValue={this.state.startDate}
						InputLabelProps={{ shrink: true, }}
						onChange={this.dateRange('startDate')} />

					<TextField className={classes.datePicker}
						id="endDate"
						type="date"
						defaultValue={this.state.endDate}
						InputLabelProps={{ shrink: true, }}
						onChange={this.dateRange('endDate')} />

					<Button type="submit" variant="contained" color="primary" onClick={this.submitDates} className={classes.fetchButton}>Fetch Data</Button>
				</form>
				    
				<Typography className={classes.heading}>Day Rating Breakdown:</Typography>
				<Pie data={{
					labels: [
						'1 Star',
						'2 Star',
						'3 Star',
						'4 Star',
						'5 Star'
					],
					datasets: [{
						data: this.ratingStats(),
						label: 'DONUTS',
						backgroundColor: [
							'red',
							'orange',
							'yellow',
							'green',
							'blue'
							
						],
						hoverBackgroundColor: [
							'red',
							'orange',
							'yellow',
							'green',
							'blue'
						]
					}]
				}} />

				
				{this.charts()[this.state.step]}
				<MobileStepper className={classes.stepper}
					steps={5}
					position="static"
					variant="text"
					activeStep={this.state.step}
					nextButton={
						<Button variant="outlined" color="primary" size="small" onClick={this.handleNext}>
							NEXT
                        </Button>
					}
					backButton={
						<Button variant="outlined" color="primary" size="small" onClick={this.handleBack}>
							BACK
                        </Button>
					}
				/>
			</div>
			</Grid>
		)
	}
}

const mapStateToProps = state => ({
	stats: state.stats,
	statsPrompt: state.statsPrompt
});

export default withStyles(styles)(connect(mapStateToProps)(Stats));
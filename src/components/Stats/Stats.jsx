import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import moment from 'moment';
import {TextField, Button, MobileStepper, Paper, Typography, SwipeableViews} from '@material-ui/core';

class Stats extends Component{

	state = {
		startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
		endDate: moment().format('YYYY-MM-DD'),
		step: 0
	}

	componentDidMount(){
		this.props.dispatch({type: 'STATS_DATE_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}})
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
		this.props.dispatch({type: 'STATS_DATE_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}})
	};//end submitDates

	charts = () => {
		return [
			<div className="chartDiv">
				<p>ONE</p>
			</div>,

			<div className="chartDiv">
				<p>TWO</p>
			</div>,

			<div className="chartDiv">
				<p>THREE</p>
			</div>,

			<div className="chartDiv">
				<p>FOUR</p>
			</div>,

			<div className="chartDiv">
				<p>FIVE</p>
			</div>,
		]
	}
	
	render(){
		// let today = new Date();
		// let monthAgo = today.setDate(today.getDate()-30);
		return(
			<div>
				<h2>Stats</h2>
				<p>Select date range:</p>
				<form onSubmit={this.dateRange}>
					<TextField
						id="startDate"
						type="date"
						defaultValue={this.state.startDate}
						InputLabelProps={{ shrink: true, }}
						onChange={this.dateRange('startDate')} />

					<TextField
						id="endDate"
						type="date"
						defaultValue={this.state.endDate}
						InputLabelProps={{ shrink: true, }}
						onChange={this.dateRange('endDate')} />

					<Button type="submit" variant="contained" color="primary" onClick={this.submitDates}>Fetch Data</Button>
				</form>
				    
				<h3>Overall Day Ratings:</h3>
				<Doughnut data={{
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
							'#FF6384',
							'#1AB71D',
							'#FFCE56',
							'#36A2EB',
							'#961EC2'
							
						],
						hoverBackgroundColor: [
							'#FF6384',
							'#1AB71D',
							'#FFCE56'
						]
					}]
				}} />


				{this.charts()[this.state.step]}
				<MobileStepper
					steps={5}
					position="static"
					variant="text"
					activeStep={this.state.step}
					nextButton={
						<Button size="small" onClick={this.handleNext}>
							NEXT
                        </Button>
					}
					backButton={
						<Button size="small" onClick={this.handleBack}>
							BACK
                        </Button>
					}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	stats: state.stats
});

export default connect(mapStateToProps)(Stats);
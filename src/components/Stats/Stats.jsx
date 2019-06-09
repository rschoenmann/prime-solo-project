import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import moment from 'moment';
import {TextField, Button} from '@material-ui/core';

class Stats extends Component{

	state = {
		startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
		endDate: moment().format('YYYY-MM-DD')
	}

	componentDidMount(){
		this.props.dispatch({type: 'STATS_DATE_RANGE', payload: {startDate: this.state.startDate, endDate:this.state.endDate}})
	}

	dateRange = propertyName => (event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};//end dateRange

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
				<p>JSON</p>
				<pre>{JSON.stringify(this.props.stats)}</pre>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	stats: state.stats
});

export default connect(mapStateToProps)(Stats);
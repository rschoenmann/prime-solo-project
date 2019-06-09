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

	dateRange = propertyName => (event) => {
		this.setState({
			[propertyName]: event.target.value
		});
	};//end dateRange

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
				    
				<h2>Doughnut Example</h2>
				<Doughnut data={{
					labels: [
						'Red',
						'Green',
						'Yellow',
						'Blue',
						'Purple'
					],
					datasets: [{
						data: [300, 50, 100],
						label: 'DONUTS',
						backgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56'
						],
						hoverBackgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56'
						]
					}]
				}} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	state
});

export default connect(mapStateToProps)(Stats);
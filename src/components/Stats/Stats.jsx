import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
//import moment from 'moment';
import {TextField} from '@material-ui/core';

class Stats extends Component{

	dateRange = (value) => {
		console.log('stats date range:', value)
		this.props.dispatch({type: 'STATS_DATE_RANGE', payload: value})
	};//end dateRange
	
	render(){
		// let today = new Date();
		// let monthAgo = today.setDate(today.getDate()-30);
		return(
			<div>
				<h2>Stats</h2>
				<p>Select date range:</p>
				
				    
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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';
import moment from 'moment';
import {TextField} from '@material-ui/core';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class Stats extends Component{

	dateRange = (event) => {
		console.log('stats date range:', event.target.value)
	};//end dateRange
	
	render(){
		let today = new Date();
		let monthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
		return(
			<div>
				<h2>Stats</h2>
				<p>Select date range:</p>
				<DateRangePicker onChange={this.dateRange}
					value={[monthAgo, today]} />
				    
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
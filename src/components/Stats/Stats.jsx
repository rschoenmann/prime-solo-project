import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HorizontalBar, Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
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
};


class Stats extends Component{
	render(){
		return(
			<div>
				<h2>Doughnut Example</h2>
        		<Doughnut data={data} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	state
});

export default connect(mapStateToProps)(Stats);
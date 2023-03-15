import React from 'react';
import {Bar} from 'react-chartjs-2'
import {chart as chartjs} from 'chart.js/auto'

function BarChart({chartData}) {
    return <Bar 
    height={400}
    width={600}
    options={{
        responsive: false,
        maintainAspectRatio: false,
    }}
    data={chartData}
    />;
}

export default BarChart;
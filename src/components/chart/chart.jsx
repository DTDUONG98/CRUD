import Chart from 'react-apexcharts';
import React from 'react';
import PropTypes from 'prop-types';
export const FormChart = ({dataChart, categories}) => {
    console.log(dataChart);
    const options = {
        plotOptions: {
            bar: {
              horizontal: true,
            }
        },
        xaxis :  {
            categories: categories
        }
    }
    const chart = {
        id: 'apexchart-example',
    }
    const series = [{
        name: 'reslut',
        data: dataChart
      }]
    return (
        <Chart 
            options={options} 
            chart={chart}
            series={series} 
            type="bar" 
            // width={520} 
            height={320} 
        />
    );
}
FormChart.propTypes = {
    dataChart: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
}
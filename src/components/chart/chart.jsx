import Chart from 'react-apexcharts';

export const FormChart = (dataChart) => {
    console.log('dataChart', dataChart.dataChart);
    const options = {
        chart: {
            id: 'apexchart-example',
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
    }
    const series = [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]

    return (
        <Chart 
            options={options} 
            series={series} 
            type="bar" 
            // width={520} 
            height={320} 
        />
    );
}
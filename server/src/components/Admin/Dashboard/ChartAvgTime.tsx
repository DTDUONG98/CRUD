import React, { useState, useEffect } from 'react'
import statisticService from '@src/services/statisticService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import usePermissionHook from "@src/hooks/PermissionHook";
import moment from 'moment'
import { Spin, Radio } from 'antd';
import { Line } from 'react-chartjs-2';

const ChartAvgTime = () => {
  const { t, notify } = useBaseHook();
  const { checkPermission } = usePermissionHook();
  const statisticPer = checkPermission({
    "statisticRequest": "R"
  })
  const unitDefault = 'hour'
  const options = [
    {key: 'hour', label: 'lastHour'},
    {key: 'today', label: 'today'},
    {key: 'week', label: 'week'},
    {key: 'month', label: 'month'}
  ]
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchData = async (unit: string, startTime, endTime) => {
    setLoading(true)
    let [error, result]: any[] = await to(statisticService().withAuth().statisticRequest({
      unit: unit,
      startTime: startTime,
      endTime: endTime
    }));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    setData(result)
  }

  useEffect(() => {
    fetchData('minute', moment().subtract(1, 'hour').toISOString(), moment().toISOString())
  }, [])

  const onChangeOption = (e: any) => {
    const value = e.target.value
    let startTime = moment().subtract(1, 'hour').toISOString(),
      endTime = moment().toISOString(), unit = 'minute'
    switch(value) {
      case 'hour':
        unit = 'minute'
        break;
      case 'today':
        unit = 'hour'
        startTime = moment().startOf('day').toISOString()
        endTime = moment().endOf('day').toISOString()
        break;
      case 'week':
        unit = 'day'
        startTime = moment().startOf('week').toISOString()
        endTime = moment().endOf('week').toISOString()
        break;
      case 'month':
        unit = 'day'
        startTime = moment().startOf('month').toISOString()
        endTime = moment().endOf('month').toISOString()
        break;
      default:
    }
    fetchData(unit, startTime, endTime)
  }

  const renderButton = () => {
    return <Radio.Group
      size="small"
      defaultValue={unitDefault}
      buttonStyle="solid"
      onChange={(e) => onChangeOption(e)}
    >
      {options.map((item: any, index: number) => <Radio.Button key={index} value={item.key}>
        {t(`pages:dashboard.types.${item.label}`)}
      </Radio.Button>)}
    </Radio.Group>
  }

  if(!statisticPer) return <></>
  let avgTimes = data.map(item => ({ t: item.t, y: item.y.avgTime, format: item.format }))

  return <>
    <Spin spinning={loading} delay={500}>
      <div className="button-choose">
        {renderButton()}
      </div>
      <Line
        data={{
          datasets: [{
            label: 'AvgTime',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            data: avgTimes,
            type: 'line',
            pointRadius: 0,
            // fill: false,
            lineTension: 0,
            borderWidth: 2
          }]
        }}
        options={{
          title: {
            display: true,
            text: "System Average Response Time"
          },
          legend: {
            display: true,
            position: "bottom"
          },
          animation: {
            duration: 0
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              offset: true,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: 'bold'
                },
                source: 'data',
                autoSkip: true,
                autoSkipPadding: 75,
                maxRotation: 0,
                sampleSize: 100
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                drawBorder: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }]
          },
          tooltips: {
            intersect: false,
            mode: 'index',
            callbacks: {
              title: function (tooltipItem, myData) {
                const datasetIndex = tooltipItem[0].datasetIndex
                const index = tooltipItem[0].index
                const data = myData.datasets[datasetIndex].data;
                const format = data[index].format || '';
                return moment(data[index].t).format(format);

              },
              label: function (tooltipItem, myData) {
                var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                  label += ': ';
                }
                label += parseFloat(tooltipItem.value).toFixed(2);
                return label;
              }
            }
          }
        }}
      />
    </Spin>
  </>
}

export default ChartAvgTime

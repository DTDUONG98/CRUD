import React, { useState, useEffect } from 'react'
import statisticService from '@src/services/statisticService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import usePermissionHook from "@src/hooks/PermissionHook";
import moment from 'moment'
import { Spin, Radio } from 'antd';
import { Line } from 'react-chartjs-2';
import auth from '@src/helpers/auth';
const dncStatus = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

const ChartStatus = () => {
  const { t, notify, getData } = useBaseHook();
  const { checkPermission } = usePermissionHook();
  const statisticPer = checkPermission({
    "statisticStatus": "R"
  })
  const { user } = auth()
  const statusT = user.type !== "admin" ? ["1", "2", "3", "4", "govnr", "govdnc"] :  [""]
  const unitDefault = 'hour'
  const options = [
    { key: 'hour', label: 'lastHour' },
    { key: 'today', label: 'today' },
    { key: 'week', label: 'week' },
    { key: 'month', label: 'month' }
  ]
  const itemBase = {
    fill: true,
    lineTension: 0
  }
  const status = {
    0: {
      ...itemBase,
      backgroundColor: "rgba(244, 67, 54, 0.5)",
      borderColor: "rgb(244, 67, 54)",
      label: "NOAGENT"
    },
    1: {
      ...itemBase,
      backgroundColor: "rgba(156, 39, 176, 0.5)",
      borderColor: "rgb(156, 39, 176)",
      label: "CWL"
    },
    2: {
      ...itemBase,
      backgroundColor: "rgba(103, 58, 183, 0.5)",
      borderColor: "rgb(103, 58, 183)",
      label: "CBL"
    },
    3: {
      ...itemBase,
      backgroundColor: "rgba(63, 81, 181, 0.5)",
      borderColor: "rgb(63, 81, 181)",
      label: "SPNR"
    },
    4: {
      ...itemBase,
      backgroundColor: "rgba(3, 169, 244, 0.5)",
      borderColor: "rgb(3, 169, 244)",
      label: "SPDNC"
    },
    5: {
      ...itemBase,
      backgroundColor: "rgba(255, 235, 59, 0.5)",
      borderColor: "rgb(255, 235, 59)",
      label: "IPTNR"
    },
    6: {
      ...itemBase,
      backgroundColor: "rgba(158, 158, 158, 0.5)",
      borderColor: "rgb(158, 158, 158)",
      label: "IPTDNC"
    },
    7: {
      ...itemBase,
      backgroundColor: "rgba(96, 125, 139, 0.5)",
      borderColor: "rgb(96, 125, 139)",
      label: "GOVNR"
    },
    8: {
      ...itemBase,
      backgroundColor: "rgba(51, 0, 102, 0.5)",
      borderColor: "rgb(51, 0, 102)",
      label: "GOVDNC"
    },
    9: {
      ...itemBase,
      backgroundColor: "rgba(4, 255, 0, 0.5)",
      borderColor: "rgb(4, 255, 0)",
      label: "INVALIDPHONE"
    },
    10: {
      ...itemBase,
      backgroundColor: "rgba(226, 136, 0, 0.5)",
      borderColor: "rgb(226, 136, 0)",
      label: "PENDING"
    },
    other: {
      ...itemBase,
      backgroundColor: "rgba(238, 238, 238, 0.5)",
      borderColor: "rgb(238, 238, 238)",
      label: "Other"
    },
    govnr: {
      ...itemBase,
      backgroundColor: "rgba(96, 125, 139, 0.5)",
      borderColor: "rgb(96, 125, 139)",
      label: "GOVNR"
    },
    govdnc: {
      ...itemBase,
      backgroundColor: "rgba(238, 238, 238, 0.5)",
      borderColor: "rgb(238, 238, 238)",
      label: "GOVDNC"
    }
  }

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchData = async (unit: string, startTime, endTime) => {
    setLoading(true)
    let [error, result]: any[] = await to(statisticService().withAuth().statisticResult({
      unit: unit,
      startTime: startTime,
      endTime: endTime,
      status: statusT
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
    switch (value) {
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

  if (!statisticPer) return <></>
  const getDataSet = () => {
    let items = []
    let statuses = user.type !== "admin" ? [...statusT] : dncStatus
    for(let item of statuses) {
      let dataT = status[item]
      items.push({
        ...dataT,
        data: data[item]
      })
    }
    return items
  }

  return <>
    <Spin spinning={loading} delay={500}>
      <div className="button-choose">
        {renderButton()}
      </div>
      <Line
        data={{
          labels: getData(data, "t", []),
          datasets: getDataSet()
        }}
        options={{
          title: {
            display: true,
            text: "Popularition Status"
          },
          legend: {
            display: true,
            position: "bottom"
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              // offset: true,
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
              display: true,
              stacked: true,
              ticks: {
                min: 0, // minimum value
                // max: 100 // maximum value
              },
              scaleLabel: {
                display: true,
                labelString: 'Requests'
              }
            }]
          },
          plugins: {
            filler: {
              propagate: false
            }
          },
          tooltips: {
            intersect: false,
            mode: 'index',
            callbacks: {
              title: function (tooltipItem, myData) {
                const datasetIndex = tooltipItem[0].datasetIndex
                const index = tooltipItem[0].index
                const datax = myData.datasets[datasetIndex].data;
                const format = getData(data, "format.0");
                return moment(data['t'][index]).format(format);

              }
            }
          }
        }}
      />
    </Spin>
  </>
}

export default ChartStatus

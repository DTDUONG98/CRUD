import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Typography } from 'antd'
import moment from 'moment'
import useBaseHook from '@src/hooks/BaseHook'
import { formatNumber } from '@src/helpers/utils'
import usePermissionHook from "@src/hooks/PermissionHook";
const { Title } = Typography;

const TableTimes = () => {
  const { t, getStore } = useBaseHook();
  const { checkPermission } = usePermissionHook();
  const dataT = getStore('dashboard.data') || []
  const [data, setData] = useState(dataT)
  const statisticPer = checkPermission({
    "statisticNumber": "R"
  })

  useEffect(() => {
    setData(dataT)
  }, [dataT.length])

  const columns = [
    {
      title: t("common:_no"),
      dataIndex: 'no',
      width: 50,
      render: (text: string, record: any, index: number) => index + 1
    },
    {
      title: t('pages:dashboard.table.time'),
      dataIndex: 't',
      render: (text: string) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : ""
    },
    {
      title: t("pages:dashboard.table.quantity"),
      dataIndex: 'y',
      render: (text: string) => formatNumber(Number(text))
    }
  ]

  if(!statisticPer) return <></>
  return <>
    <Title level={4} underline>{t("pages:dashboard.content.title")}</Title>
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ["5", "10", "50", "100", "200", "500"] }}
      rowKey="t"
    />
  </>
}

export default TableTimes

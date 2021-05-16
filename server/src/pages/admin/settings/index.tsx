import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import settingService from '@src/services/settingService';
import to from 'await-to-js'
import moment from 'moment'
import useBaseHook from '@src/hooks/BaseHook'
import { EditOutlined } from '@ant-design/icons';
import usePermissionHook from "@src/hooks/PermissionHook";

const Index = () => {
  const { t, notify, redirect } = useBaseHook();
  const tableRef = useRef(null)
  const { checkPermission } = usePermissionHook();
  const updatePer = checkPermission({
    "settings": "U"
  })

  const columns = [
    {
      title: t('pages:settings.table.name'),
      dataIndex: 'name',
      key: 'settings.name',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => {
        return updatePer ? (
          <a onClick={() => redirect('frontend.admin.settings.edit', { id: record.id })}>
            <span className="show-on-hover">
              {record.name}
              <EditOutlined className="show-on-hover-item" />
            </span>
          </a>
        ): record.name
      }
    },
    {
      title: t("pages:settings.table.description"),
      dataIndex: 'description',
      key: 'settings.description',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:settings.table.value"),
      dataIndex: 'value',
      key: 'settings.value',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:settings.table.createdAt"),
      dataIndex: 'createdAt',
      key: 'settings.createdAt',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) =>
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
    }
  ]

  const fetchData = async (values: any) => {
    if(!values.sorting.length) {
      values.sorting = [
        { field: "settings.id", direction: "desc" },
      ]
    }
    let [error, settings]: [any, Setting[]] = await to(settingService().withAuth().index(values))
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), '', 'error')
      return {}
    }
    return settings
  }

  return <>
    <div className="content">
      <GridTable
        ref={tableRef}
        columns={columns}
        fetchData={fetchData}
        addIndexCol={true}
      />
    </div>
  </>
}

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:settings.index.title")}
    description={t("pages:settings.index.description")}
    {...props}
  />
}

Index.permissions = {
  "settings": "R"
};

export default Index

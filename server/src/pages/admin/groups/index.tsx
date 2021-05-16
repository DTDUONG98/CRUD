import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import { confirmDialog } from '@src/helpers/dialogs'
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import { Button } from 'antd';
import groupService from '@src/services/groupService';
import to from 'await-to-js'
import moment from 'moment'
import useBaseHook from '@src/hooks/BaseHook'
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import usePermissionHook from "@src/hooks/PermissionHook";

const Index = () => {
  const { t, notify, redirect } = useBaseHook();
  const tableRef = useRef(null)
  const [hiddenDeleteBtn, setHiddenDeleteBtn] = useState(true)
  const [selectedIds, setSelectedIds] = useState([])
  const { checkPermission } = usePermissionHook();
  const createPer = checkPermission({
    "groups": "C"
  })
  const updatePer = checkPermission({
    "groups": "U"
  })
  const deletePer = checkPermission({
    "groups": "D"
  })

  const columns = [
    {
      title: t('pages:groups.table.name'),
      dataIndex: 'name',
      key: 'groups.name',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => {
        return updatePer ? (
          <a onClick={() => redirect('frontend.admin.groups.edit', { id: record.id })}>
            <span className="show-on-hover">
              {record.name}
              <EditOutlined className="show-on-hover-item" />
            </span>
          </a>
        ): record.name
      }
    },
    {
      title: t("pages:groups.table.description"),
      dataIndex: 'description',
      key: 'groups.description',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:groups.table.parent"),
      dataIndex: 'parentName',
      key: 'groups.parentId',
      sorter: true,
      filterable: true
    },
    {
      title: t("pages:groups.table.role"),
      dataIndex: 'roleName',
      key: 'role_groups.roleGroupId',
      sorter: true,
      filterable: true
    },
    {
      title: t("pages:groups.table.createdAt"),
      dataIndex: 'createdAt',
      key: 'groups.createdAt',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) =>
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
    }
  ]

  const onChangeSelection = (data: any) => {
    if (data.length > 0) setHiddenDeleteBtn(false)
    else setHiddenDeleteBtn(true)
    setSelectedIds(data)
  }

  const fetchData = async (values: any) => {
    if(!values.sorting.length) {
      values.sorting = [
        { field: "groups.id", direction: "desc" },
      ]
    }
    let [error, groups]: [any, Group[]] = await to(groupService().withAuth().index(values))
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), '', 'error')
      return {}
    }
    return groups
  }

  const onDelete = async () => {
    let [error, result]: any[] = await to(groupService().withAuth().delete({ ids: selectedIds }));
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordGroupDeleted"));
    if (tableRef.current !== null) {
      tableRef.current.reload()
    }
    setSelectedIds([])
    setHiddenDeleteBtn(true)
  }

  return <>
    <div className="content">
      <Button hidden={!createPer}
        onClick={() => redirect("frontend.admin.groups.create")}
        type="primary"
        className='btn-top'
      >
        <PlusCircleOutlined />
        {t('buttons:create')}
      </Button>
      <Button
        type="primary" danger
        className='btn-top'
        hidden={hiddenDeleteBtn || !deletePer}
        onClick={() => {
          confirmDialog({
            title: t('buttons:deleteItem'),
            content: t('messages:message.deleteConfirm'),
            onOk: () => onDelete()
          })
        }}
      >
        <DeleteOutlined />
        {t('buttons:delete')}
      </Button>
      <GridTable
        ref={tableRef}
        columns={columns}
        fetchData={fetchData}
        rowSelection={{selectedRowKeys: selectedIds, onChange: (data: any[]) => onChangeSelection(data) }}
        addIndexCol={false}
      />
    </div>
  </>
}

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:groups.index.title")}
    description={t("pages:groups.index.description")}
    {...props}
  />
}

Index.permissions = {
  "groups": "R"
};

export default Index

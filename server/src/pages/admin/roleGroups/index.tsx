import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import { confirmDialog } from '@src/helpers/dialogs'
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import { Button } from 'antd';
import roleGroupService from '@root/src/services/roleGroupService';
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
    "roleGroups": "C"
  })
  const updatePer = checkPermission({
    "roleGroups": "U"
  })
  const deletePer = checkPermission({
    "roleGroups": "D"
  })

  const columns = [
    {
      title: t('pages:roleGroups.table.name'),
      dataIndex: 'name',
      key: 'role_groups.name',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => {
        return updatePer ? (
          <a onClick={() => redirect('frontend.admin.roleGroups.edit', { id: record.id })}>
            <span className="show-on-hover">
              {record.name}
              <EditOutlined className="show-on-hover-item" />
            </span>
          </a>
        ): record.name
      }
    },
    {
      title: t("pages:roleGroups.table.description"),
      dataIndex: 'description',
      key: 'role_groups.description',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:roleGroups.table.parent"),
      dataIndex: 'parentName',
      key: 'role_groups.parentId',
      sorter: true,
      filterable: true
    },
    {
      title: t("pages:roleGroups.table.createdAt"),
      dataIndex: 'createdAt',
      key: 'role_groups.createdAt',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) =>
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
    },
    {
      title: t("pages:roleGroups.table.decentralization"),
      dataIndex: 'decentralization',
      key: "decentralization",
      render: (text: string, record: any) => {
        return (<>
          {(createPer || updatePer) && record.parentId ? (
             <Button onClick={() => redirect("frontend.admin.roleGroups.role", { id: record.id })} type="primary">
              <PlusCircleOutlined />
              {t('buttons:decentralization')}
            </Button>
          ): null}
        </>
        )
      }
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
        { field: "role_groups.id", direction: "desc" },
      ]
    }
    let [error, roleGroups]: [any, RoleGroup[]] = await to(roleGroupService().withAuth().index(values))
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), '', 'error')
      return {}
    }
    return roleGroups
  }

  const onDelete = async () => {
    let [error, result]: any[] = await to(roleGroupService().withAuth().delete({ ids: selectedIds }));
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordRoleGroupDeleted"));
    if (tableRef.current !== null) {
      tableRef.current.reload()
    }
    setSelectedIds([])
    setHiddenDeleteBtn(true)
  }

  return <>
    <div className="content">
      <Button hidden={!createPer}
        onClick={() => redirect("frontend.admin.roleGroups.create")}
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
    title={t("pages:roleGroups.index.title")}
    description={t("pages:roleGroups.index.description")}
    {...props}
  />
}

Index.permissions = {
  "roleGroups": "R"
};

export default Index

import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { GridTable } from '@src/components/Table';
import FilterDatePicker from '@src/components/Table/SearchComponents/DatePicker'
import { Button } from 'antd';
import adminService from '@src/services/adminService';
import _ from 'lodash'
import moment from 'moment'
import to from 'await-to-js'
import auth from '@src/helpers/auth'
import React, { useState, useRef } from 'react';
import { confirmDialog } from '@src/helpers/dialogs'
import useBaseHook from '@src/hooks/BaseHook'
import usePermissionHook from "@src/hooks/PermissionHook";
import { PlusCircleOutlined, DeleteOutlined, LoginOutlined, EditOutlined } from '@ant-design/icons';

const Index = () => {
  const { t, notify, redirect } = useBaseHook();
  const tableRef = useRef(null)
  const { checkPermission } = usePermissionHook();
  const [selectedIds, setSelectedIds] = useState([])
  const [hiddenDeleteBtn, setHiddenDeleteBtn] = useState(true)
  const createPer = checkPermission({
    "admins": "C"
  })
  const updatePer = checkPermission({
    "admins": "U"
  })
  const deletePer = checkPermission({
    "admins": "D"
  })

  const columns = [
    {
      title: t('pages:admins.table.firstName'),
      dataIndex: 'firstName',
      key: 'admins.firstName',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => {
        return updatePer ? (
          <a onClick={() => redirect('frontend.admin.admins.edit', { id: record.id })}>
            <span className="show-on-hover">
              {record.firstName}
              <EditOutlined className="show-on-hover-item" />
            </span>
          </a>
        ): record.firstName
      }
    },
    {
      title: t('pages:admins.table.lastName'),
      dataIndex: 'lastName',
      key: 'admins.lastName',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:admins.table.username"),
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:admins.table.email"),
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:admins.table.group"),
      dataIndex: 'groupName',
      key: 'groups.name',
      sorter: true,
      filterable: true,
    },
    {
      title: t("pages:admins.table.createdAt"),
      dataIndex: 'createdAt',
      key: 'admins.createdAt',
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) =>
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
    },
    // {
    //   title: t("pages:action"),
    //   dataIndex: 'action',
    //   key: "action",
    //   render: (text: string, record: any) => {
    //     return (<>
    //       {record.id !== auth().user.id ? (
    //         <Button onClick={() => loginAs(record)}
    //           className="btn-margin-right"
    //         >
    //           <LoginOutlined />
    //           {t('buttons:loginAs')}
    //         </Button>
    //       ): null}
    //     </>
    //     )
    //   }
    // }
  ]

  const loginAs = async (record: any) => {
    let [error, result]: any[] = await to(adminService().withAuth().loginAs({ id: record.id }))
    if (error) return notify(t('messages:message.loginFailed'), t(`errors:${error.code}`), 'error')
    auth().setAuth(result)
    notify(t('messages:message.loginSuccess'))
    redirect('frontend.admin.dashboard.index')
  }

  const onChangeSelection = (data: any) => {
    if (data.length > 0) setHiddenDeleteBtn(false)
    else setHiddenDeleteBtn(true)
    setSelectedIds(data)
  }

  const fetchData = async (values: any) => {
    if(!values.sorting.length) {
      values.sorting = [
        { field: "admins.id", direction: "desc" },
      ]
    }
    let [error, users]: [any, Admin[]] = await to(adminService().withAuth().index(values))
    if (error) {
      const { code, message } = error
      notify(t(`errors:${code}`), t(message), 'error')
      return {}
    }
    return users
  }

  const onDelete = async () => {
    let [error, result]: any[] = await to(adminService().withAuth().delete({ ids: selectedIds }));
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordAdminDeleted"));
    if (tableRef.current !== null) {
      tableRef.current.reload()
    }
    setSelectedIds([])
    setHiddenDeleteBtn(true)
    return result
  }

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.id == auth().user.id,
      id: record.id,
    }),
  };

  return <>
    <div className="content">
      <Button hidden={!createPer}
        onClick={() => redirect("frontend.admin.admins.create")}
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
        rowSelection={{
          selectedRowKeys: selectedIds, onChange: (data: any[]) => onChangeSelection(data),
          ...rowSelection
        }}
        addIndexCol={false}
      />
    </div>
  </>
}

Index.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:admins.index.title")}
    description={t("pages:admins.index.description")}
    {...props}
  />
}

Index.permissions = {
  "admins": "R"
};

export default Index

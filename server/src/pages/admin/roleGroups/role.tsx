import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Checkbox, Table, Spin } from 'antd';
import rolePermissionService from '@src/services/rolePermissionService';
import roleGroupPermissionService from '@src/services/roleGroupPermissionService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled } from '@ant-design/icons';

const Role = () => {
  let result: any = {}
  const { t, notify, redirect, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const { query } = router
  const { id: groupId } = query
  const [state, setState] = useState({
    permissions: []
  });

  const fetchData = async() => {
    let idError: any = null;
    if (!groupId) {
      idError = {
        code: 9996,
        message: 'missing ID'
      }
    }
    if(idError) return notify(t(`errors:${idError.code}`), '', 'error')
    let [permissionError, permissions]: any[] = await to(rolePermissionService().withAuth().getPermissionByGroupId({ groupId: groupId }));
    if(permissionError) return notify(t(`errors:${permissionError.code}`), '', 'error')
    setState({
      ...state,
      permissions: permissions
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    let [error, result]: any[] = await to(roleGroupPermissionService().withAuth().update({
      permissions: values,
      groupId: groupId
    }));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), t(error.message), 'error')
    notify(t("messages:message.recordRoleCreated"))
    redirect("frontend.admin.roleGroups.index")
    return result
  }

  const renderCheckbox = (row: any, permission: number) => {
    function onChange(e: any) {
      e.target.checked ? row.currentValue += permission : row.currentValue -= permission;
      result[row.key] = row.currentValue
    }

    const checked = (row.currentValue & permission) === permission
    const disabled = (row.value & permission) !== permission
    return <Checkbox defaultChecked={checked} disabled={disabled} onChange={onChange}></Checkbox>
  }

  const renderPermissionCategory = (category: any) => {
    const columns = [
      {
        title: "#",
        width: '5%',
        render: (text: string, record: any, index: number) => index + 1,
      },
      {
        title: category.name,
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: t("buttons:create"),
        dataIndex: 'value',
        key: 'valueC',
        width: '10%',
        align: 'center' as 'center',
        render: (value: any, row: any) => renderCheckbox(row, 8)
      },
      {
        title: t("buttons:view"),
        dataIndex: 'value',
        key: 'valueR',
        width: '10%',
        align: 'center' as 'center',
        render: (value: any, row: any) => renderCheckbox(row, 4)
      },
      {
        title: t("buttons:edit"),
        dataIndex: 'value',
        key: 'valueU',
        width: '10%',
        align: 'center' as 'center',
        render: (value: any, row: any) => renderCheckbox(row, 2)
      },
      {
        title: t("buttons:delete"),
        dataIndex: 'value',
        key: 'valueD',
        width: '10%',
        align: 'center' as 'center',
        render: (value: any, row: any) => renderCheckbox(row, 1)
      }
    ];
    return <Table size="small" key={Number(category.id)} columns={columns} rowKey="id" dataSource={category.permissions} pagination={false} />
  }

  if(!state.permissions.length) return <div className="content"><Spin /></div>

  return <>
    <div className="content">
      {state.permissions.map((g: any) => renderPermissionCategory(g))}
      <div className="text-center" style={{ marginTop: "24px"}}>
        <Button onClick={() => router.back()} className="btn-margin-right">
          <LeftCircleFilled /> {t('buttons:back')}
        </Button>
        <Button onClick={() => onFinish(result)} type="primary" htmlType="submit" loading={loading} className="btn-margin-right">
          <SaveFilled /> {t('buttons:submit')}
        </Button>
      </div>
    </div>
  </>
}

Role.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:roleGroups.role.title")}
    description={t("pages:roleGroups.role.description")}
    {...props}
  />
}

Role.permissions = {
  "adminDecentralization": "U"
}

export default Role

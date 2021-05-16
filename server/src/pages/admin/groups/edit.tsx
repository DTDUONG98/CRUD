import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Form, Spin } from 'antd';
import groupService from '@src/services/groupService';
import { confirmDialog } from '@src/helpers/dialogs'
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled, DeleteFilled } from '@ant-design/icons';
import usePermissionHook from "@src/hooks/PermissionHook";
import GroupForm from '@src/components/Admin/Group/GroupForm';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};


const Edit = () => {
  const { t, notify, redirect, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const [group, setGroup]: any[] = useState();
  const [form] = Form.useForm();
  const { checkPermission } = usePermissionHook();
  const { query } = router
  const deletePer = checkPermission({
    "groups": "D"
  })

  const fetchData = async() => {
    let idError: any = null;
    if (!query.id) {
      idError = {
        code: 9996,
        message: 'missing ID'
      }
    }
    if(idError) return notify(t(`errors:${idError.code}`), '', 'error')
    let [groupError, group]: [any, Group] = await to(groupService().withAuth().detail({ id: query.id }));
    if(groupError) return notify(t(`errors:${groupError.code}`), '', 'error')
    setGroup(group)
  }

  useEffect(() => {
    fetchData()
  }, []);

  //submit form
  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    let [error, result]: any[] = await to(groupService().withAuth().edit({
      id: group.id,
      ...values
    }));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordGroupUpdated"))
    redirect("frontend.admin.groups.index")
    return result
  }

  const onDelete = async (): Promise<void> => {
    let [error, result]: any[] = await to(groupService().withAuth().destroy({id: group.id}));
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t('messages:message.recordGroupDeleted'))
    redirect("frontend.admin.groups.index")
    return result
  }

  if(!group) return <div className="content"><Spin /></div>
  return <>
    <div className="content">
      <Form
        {...formItemLayout}
        form={form}
        name="editGroup"
        initialValues={{
          code: group.code,
          name: group.name,
          description: group.description,
          parentId: group.parentId,
          roleGroupId: group.roleGroupId
        }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <GroupForm />
        <Form.Item wrapperCol={{ span: 24 }} className="text-center">
          <Button onClick={() => router.back()} className="btn-margin-right">
            <LeftCircleFilled /> {t('buttons:back')}
          </Button>
          <Button type="primary" htmlType="submit" className="btn-margin-right" loading={loading}>
            <SaveFilled /> {t('buttons:submit')}
          </Button>
          <Button hidden={!deletePer} danger
            onClick={() => {
              confirmDialog({
                title: t('buttons:deleteItem'),
                content: t('messages:message.deleteConfirm'),
                onOk: () => onDelete()
              })
            }}
          >
            <DeleteFilled /> {t('buttons:deleteItem')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </>
}

Edit.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:groups.edit.title")}
    description={t("pages:groups.edit.description")}
    {...props}
  />
}

Edit.permissions = {
  "groups": "U"
}

export default Edit

import React, { useState } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Form } from 'antd';
import groupService from '@src/services/groupService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled } from '@ant-design/icons';
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

const Create = () => {
  const { t, notify, redirect, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  //submit form
  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    let [error, result]: any[] = await to(groupService().withAuth().create(values));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordGroupCreated"))
    redirect("frontend.admin.groups.index")
    return result
  }

  return <>
    <div className="content">
      <Form
        {...formItemLayout}
        form={form}
        name="createGroup"
        initialValues={{
          code: "",
          name: "",
          description: ""
        }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <GroupForm />
        <Form.Item wrapperCol={{ span: 24 }} className="text-center">
          <Button onClick={() => router.back()} className="btn-margin-right">
            <LeftCircleFilled /> {t('buttons:back')}
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} className="btn-margin-right">
            <SaveFilled /> {t('buttons:submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </>
}

Create.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:groups.create.title")}
    description={t("pages:groups.create.description")}
    {...props}
  />
}

Create.permissions = {
  "groups": "C"
}

export default Create

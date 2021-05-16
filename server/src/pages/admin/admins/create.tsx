import React, { useState } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Form, Col, Row } from 'antd';
import adminService from '@src/services/adminService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled } from '@ant-design/icons';
import AdminForm from '@src/components/Admin/Admins/AdminForm';

const Create = () => {
  const { t, notify, redirect, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  //submit form
  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    let { rePassword, ...otherValues } = values;
    let [error, result]: any[] = await to(adminService().withAuth().create(otherValues));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordAdminCreated"))
    redirect("frontend.admin.admins.index")
    return result
  }

  return <>
    <div className="content">
      <Form
        form={form}
        name="createAdmin"
        layout="vertical"
        initialValues={{
          username: "",
          password: "",
          rePassword: "",
          groupId: undefined,
          firstName: "",
          email: "",
          lastName: ""
        }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Row>
          <Col md={{span: 16, offset: 4}}>
            <AdminForm form={form} isEdit={false} />
            <Form.Item wrapperCol={{ span: 24 }} className="text-center">
              <Button onClick={() => router.back()} className="btn-margin-right">
                <LeftCircleFilled /> {t('buttons:back')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} className="btn-margin-right">
                <SaveFilled /> {t('buttons:submit')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </>
}

Create.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:admins.create.title")}
    description={t("pages:admins.create.description")}
    {...props}
  />
}

Create.permissions = {
  "admins": "C"
}

export default Create

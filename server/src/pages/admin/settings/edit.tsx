import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Form, Spin } from 'antd';
import settingService from '@src/services/settingService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled } from '@ant-design/icons';
import SettingForm from '@src/components/Admin/Setting/SettingForm';

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
  const [setting, setSetting] = useState<Setting>();
  const [form] = Form.useForm();
  const { query } = router

  const fetchData = async() => {
    let idError: any = null;
    if (!query.id) {
      idError = {
        code: 9996,
        message: 'missing ID'
      }
    }
    if(idError) return notify(t(`errors:${idError.code}`), '', 'error')
    let [settingError, setting]: [any, Setting] = await to(settingService().withAuth().detail({ id: query.id }));
    if(settingError) return notify(t(`errors:${settingError.code}`), '', 'error')
    setSetting(setting)
  }

  useEffect(() => {
    fetchData()
  }, []);

  //submit form
  const onFinish = async (values: any): Promise<void> => {
    setLoading(true)
    let [error, result]: any[] = await to(settingService().withAuth().edit({
      id: setting.id,
      ...values
    }));
    setLoading(false)
    if (error) return notify(t(`errors:${error.code}`), '', 'error')
    notify(t("messages:message.recordUpdated"))
    redirect("frontend.admin.settings.index")
    return result
  }

  if(!setting) return <div className="content"><Spin /></div>
  return <>
    <div className="content">
      <Form
        {...formItemLayout}
        form={form}
        name="editSetting"
        initialValues={{
          name: setting.name,
          description: setting.description,
          value: setting.value
        }}
        onFinish={onFinish}
        scrollToFirstError
      >
        <SettingForm />
        <Form.Item wrapperCol={{ span: 24 }} className="text-center">
          <Button onClick={() => router.back()} className="btn-margin-right">
            <LeftCircleFilled /> {t('buttons:back')}
          </Button>
          <Button type="primary" htmlType="submit" className="btn-margin-right" loading={loading}>
            <SaveFilled /> {t('buttons:submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </>
}

Edit.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:settings.edit.title")}
    description={t("pages:settings.edit.description")}
    {...props}
  />
}

Edit.permissions = {
  "settings": "U"
}

export default Edit

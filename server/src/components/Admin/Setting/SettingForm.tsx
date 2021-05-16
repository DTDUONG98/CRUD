import React from 'react'
import { Form, Input } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
const { TextArea } = Input;

const SettingForm = () => {
  const { t } = useBaseHook();

  return <>
    <Form.Item
      label={t("pages:settings.form.name")}
      name="name"
      rules={[
        { required: true, message: t('messages:form.required', { name: t('pages:settings.form.name') }) },
        { whitespace: true, message: t('messages:form.required', { name: t('pages:settings.form.name') }) },
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:settings.form.name'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:settings.form.name")} />
    </Form.Item>
    <Form.Item
      label={t("pages:settings.form.description")}
      name="description"
      rules={[
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:settings.form.description'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:settings.form.description")} />
    </Form.Item>
    <Form.Item
      label={t("pages:settings.form.value")}
      name="value"
      rules={[
        { required: true, message: t('messages:form.required', { name: t('pages:settings.form.value') }) },
        { whitespace: true, message: t('messages:form.required', { name: t('pages:settings.form.value') }) },
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:settings.form.value'), length: 255 }) }
      ]}
    >
      <TextArea
        placeholder={t("pages:settings.form.value")}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Form.Item>
  </>
}

export default SettingForm

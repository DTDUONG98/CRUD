import React from 'react'
import { Form, Input, Row, Col, Checkbox, Select } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
import { LockOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select

const DncAccountForm = ({ dncAccount }: { dncAccount: any }) => {
  const { t, getData } = useBaseHook();

  const renderOption = () => {
    let emails = getData(dncAccount, "emails", [])
    if (!emails.length) return null
    return dncAccount.emails.map((item: any, index: number) => <Option key={index} value={item}>{item}</Option>)
  }

  const emailValidator = (rule: any, values: any) => {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const invalidInputs = values.filter((value) => !value.match(emailRegex));
    if (invalidInputs.length === 0) {
      return Promise.resolve();
    } else if (invalidInputs.length === 1) {
      return Promise.reject(t('messages:form.invalidEmail', { email: invalidInputs.join('') }));
    } else {
      return Promise.reject(t('messages:form.invalidEmails', { emails: invalidInputs.slice(0, -1).join(', '), email: invalidInputs.slice(-1) }));
    }
  }

  return <Row gutter={[24, 0]}>
    <Col md={12}>
      <Form.Item
        label={t("pages:dncAccounts.form.uen")}
        name="uen"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.uen') }) },
          { whitespace: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.uen') }) },
          { max: 255, message: t('messages:form.maxLength', { name: t('pages:dncAccounts.form.uen'), length: 255 }) }
        ]}
      >
        <Input placeholder={t("pages:dncAccounts.form.uen")} />
      </Form.Item>
    </Col>
    <Col md={12}>
      <Form.Item
        label={t("pages:dncAccounts.form.corpPassId")}
        name="corpPassId"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.corpPassId') }) },
          { whitespace: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.corpPassId') }) },
          { max: 255, message: t('messages:form.maxLength', { name: t('pages:dncAccounts.form.corpPassId'), length: 255 }) }
        ]}
      >
        <Input placeholder={t("pages:dncAccounts.form.corpPassId")} />
      </Form.Item>
    </Col>
    <Col md={24}>
      <Form.Item
        label={t("pages:dncAccounts.form.password")}
        name="password"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.password') }) },
        ]}
      >
        <Input.Password
          placeholder={t('pages:dncAccounts.form.password')}
          prefix={<LockOutlined />}
          autoComplete="off"
        />
      </Form.Item>
    </Col>
    <Col md={24}>
      <Form.Item
        label={t("pages:dncAccounts.form.email")}
        name="emails"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.email') }) },
          { validator: emailValidator }
        ]}
      >
        <Select mode="tags" placeholder={t("pages:dncAccounts.form.email")} tokenSeparators={[',']}>
          {renderOption()}
        </Select>
      </Form.Item>
    </Col>
    <Col md={24}>
      <Form.Item
        label={t("pages:dncAccounts.table.cookie")}
        name="cookie"
      >
        <TextArea
          placeholder={t("pages:dncAccounts.table.cookie")}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
    </Col>
    <Col md={24}>
      <Form.Item
        name="enable"
        valuePropName="checked"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:dncAccounts.form.enable') }) },
        ]}
      >
        <Checkbox>{t("pages:dncAccounts.form.enable")}</Checkbox>
      </Form.Item>
    </Col>
  </Row>
}

export default DncAccountForm

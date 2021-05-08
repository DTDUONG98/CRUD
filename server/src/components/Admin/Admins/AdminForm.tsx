import React from 'react'
import { Form, Input, Row, Col, Select } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
import validatorHook from '@src/hooks/ValidatorHook'
import { LockOutlined } from '@ant-design/icons';
import groupService from '@src/services/groupService'
import useSWR from 'swr';

const { Option } = Select

const AdminForm = ({ form, isEdit }: { form: any, isEdit: boolean }) => {
  const { t, getData } = useBaseHook();
  const { validatorRePassword, CustomRegex } = validatorHook();
  const { data: dataT } = useSWR('groupSelect2', () => groupService().withAuth().select2({ pageSize: -1 }))
  const groups = getData(dataT, "data", [])

  return <Row gutter={[24, 0]}>
    <Col md={24}>
      <Form.Item
        label={t("pages:admins.form.username")}
        name="username"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:admins.form.username') }) },
          { whitespace: true, message: t('messages:form.required', { name: t('pages:admins.form.username') }) },
          { min: 6, message: t('messages:form.minLength', { name: t('pages:admins.form.username'), length: 6 }) },
          { max: 100, message: t('messages:form.maxLength', { name: t('pages:admins.form.username'), length: 100 }) },
          CustomRegex({
            length: 6,
            reGex: '^[0-9A-z._](\\w|\\.|_){5,100}$',
            message: t('messages:form.username')
          })
        ]}
      >
        <Input
          placeholder={t("pages:admins.form.username")}
          readOnly={isEdit}
        />
      </Form.Item>
    </Col>

    {!isEdit ? (
      <>
        <Col md={12}>
          <Form.Item
            label={t("pages:admins.form.password")}
            name="password"
            rules={[
              { required: true, message: t('messages:form.required', { name: t('pages:admins.form.password') }) },
              { min: 6, message: t('messages:form.minLength', { name: t('pages:admins.form.password'), length: 6 }) },
              { max: 100, message: t('messages:form.maxLength', { name: t('pages:admins.form.password'), length: 100 }) },
              CustomRegex({
                length: 6,
                reGex: '^[0-9A-Za-z]\\w{5,100}$',
                message: t('messages:form.password')
              })
            ]}
          >
            <Input.Password
              placeholder={t('pages:admins.form.password')}
              prefix={<LockOutlined />}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item
            label={t("pages:admins.form.rePassword")}
            name="rePassword"
            rules={[
              { required: true, message: t('messages:form.required', { name: t('pages:admins.form.rePassword') }) },
              validatorRePassword({
                key: 'password',
                message: t('messages:form.rePassword'),
                getFieldValue: form.getFieldValue
              })
            ]}
          >
            <Input.Password
              placeholder={t('pages:admins.form.rePassword')}
              prefix={<LockOutlined />}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </>
    ) : null}

    <Col md={12}>
      <Form.Item
        label={t("pages:admins.form.firstName")}
        name="firstName"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:admins.form.firstName') }) },
          { max: 255, message: t('messages:form.maxLength', { name: t('pages:admins.form.firstName'), length: 255 }) }
        ]}
      >
        <Input
          placeholder={t('pages:admins.form.firstName')}
        />
      </Form.Item>
    </Col>
    <Col md={12}>
      <Form.Item
        label={t("pages:admins.form.lastName")}
        name="lastName"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:admins.form.lastName') }) },
          { max: 255, message: t('messages:form.maxLength', { name: t('pages:admins.form.lastName'), length: 255 }) }
        ]}
      >
        <Input
          placeholder={t('pages:admins.form.lastName')}
        />
      </Form.Item>
    </Col>
    {!isEdit ? (<>
      <Col md={24}>
        <Form.Item
          label={t("pages:admins.form.group")}
          name="groupId"
          rules={[
            { required: true, message: t('messages:form.required', { name: t('pages:admins.form.group') }) },
          ]}
        >
          <Select placeholder={t("pages:admins.form.group")} allowClear showSearch>
            {groups.map((item: any) => (
              <Option value={item.value} key={item.value}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </>) : null}
    <Col md={24}>
      <Form.Item
        label={t("pages:admins.table.email")}
        name="email"
        rules={[
          { required: true, message: t('messages:form.required', { name: t('pages:admins.form.email') }) },
          { type: 'email', message: t('messages:form.email') },
          { max: 255, message: t('messages:form.maxLength', { name: t('pages:admins.table.email'), length: 255 }) }
        ]}
      >
        <Input
          placeholder={t('pages:admins.table.email')}
          type="email"
        />
      </Form.Item>
    </Col>
  </Row>
}

export default AdminForm

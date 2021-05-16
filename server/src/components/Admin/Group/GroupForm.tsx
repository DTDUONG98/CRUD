import React from 'react'
import { Form, Input, Select } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
import roleGroupService from '@src/services/roleGroupService'
import groupService from '@src/services/groupService'
import useSWR from 'swr';

const { Option } = Select

const GroupForm = () => {
  const { t, getData, router } = useBaseHook();
  const { data } = useSWR('roleGroupSelect2', () => roleGroupService().withAuth().select2({ pageSize: -1 }))
  const roles = getData(data, "data", [])
  const { query } = router
  const { data: dataT } = useSWR('selectParent', () => groupService().withAuth().selectParent({ id: query.id, pageSize: -1 }))
  const groups = getData(dataT, "data", [])

  return <>
    <Form.Item
      label={t("pages:groups.table.code")}
      name="code"
      rules={[
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:groups.table.code'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:groups.table.code")} />
    </Form.Item>
    <Form.Item
      label={t("pages:groups.table.name")}
      name="name"
      rules={[
        { required: true, message: t('messages:form.required', { name: t('pages:groups.table.name') }) },
        { whitespace: true, message: t('messages:form.required', { name: t('pages:groups.table.name') }) },
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:groups.table.name'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:groups.table.name")} />
    </Form.Item>
    <Form.Item
      label={t("pages:groups.table.description")}
      name="description"
      rules={[
        { max: 255, message: t('messages:form.maxLength', { name: t('pages:groups.table.description'), length: 255 }) }
      ]}
    >
      <Input placeholder={t("pages:groups.table.description")} />
    </Form.Item>
  </>
}

export default GroupForm

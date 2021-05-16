import React from 'react'
import { Form, Input } from 'antd';
import useBaseHook from '@src/hooks/BaseHook';
import validatorHook from '@src/hooks/ValidatorHook';

const AgentForm = ({ form }: { form : any}) => {
  const { t } = useBaseHook();
  const { phoneNumberSGP } = validatorHook();

  return <>
    <Form.Item
      label={t("pages:agents.table.phoneNumber")}
      name="phoneNumber"
      rules={[
        { required: true, message: t('messages:form.required', { name: t('pages:agents.table.phoneNumber') }) },
        phoneNumberSGP({ message: t('messages:form.invalidPhoneNumber') })
      ]}
    >
      <Input
        placeholder={t("pages:agents.table.phoneNumber")}
        maxLength={8}
      />
    </Form.Item>
  </>
}

export default AgentForm

import React from 'react'
import { Form, Input, Row, Col } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
const { TextArea } = Input;

const FormSearch = () => {
    const { t } = useBaseHook();

    return (<>
        <Row gutter={[24, 0]}>
            <Col md={8}>
                <Form.Item
                    label={t("pages:foreign_raw_datas.form.type")}
                    name="foreign_raw_datas.type"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_raw_datas.form.name') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_raw_datas.form.type') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_raw_datas.form.type'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_raw_datas.form.type")} />
                </Form.Item>
            </Col>
            <Col md={16}>
                <Form.Item
                    label={t("pages:foreign_raw_datas.form.data")}
                    name="foreign_raw_datas.data"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_raw_datas.form.activeIngredient') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_raw_datas.form.data') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_raw_datas.form.data') }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_raw_datas.form.data")} />
                </Form.Item>
            </Col>
        </Row>
    </>)
}

export default FormSearch;
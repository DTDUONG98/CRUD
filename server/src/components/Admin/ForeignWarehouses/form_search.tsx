import React from 'react'
import { Form, Input, Row, Col } from 'antd';
import useBaseHook from '@src/hooks/BaseHook'
const { TextArea } = Input;

const FormSearch = () => {
    const { t } = useBaseHook();

    return (<>
        <Row gutter={[24, 0]}>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.name")}
                    name="foreign_warehouses.name"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.name') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.name') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.name'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.name")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.activeIngredient")}
                    name="foreign_warehouses.activeIngredient"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.activeIngredient') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.activeIngredient') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.activeIngredient'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.activeIngredient")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.strength")}
                    name="foreign_warehouses.strength"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.strength') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.strength') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.strength'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.strength")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.form")}
                    name="foreign_warehouses.form"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.company') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.form') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.form'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.form")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.package")}
                    name="foreign_warehouses.package"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.package') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.fpackageorm') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.package'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.package")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.unit")}
                    name="foreign_warehouses.unit"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.unit') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.unit') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.unit'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.unit")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.company")}
                    name="foreign_warehouses.company"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.company') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.company') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.company'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.company")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:foreign_warehouses.form.registerCode")}
                    name="foreign_warehouses.registerCode"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.registerCode') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:foreign_warehouses.form.registerCode') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:foreign_warehouses.form.registerCode'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:foreign_warehouses.form.registerCode")} />
                </Form.Item>
            </Col>
        </Row>

    </>)
}

export default FormSearch;
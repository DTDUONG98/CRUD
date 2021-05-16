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
                    label={t("pages:vn_warehouses.form.name")}
                    name="vn_warehouses.name"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.name') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.name') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.name'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.name")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.activeIngredient")}
                    name="vn_warehouses.activeIngredient"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.activeIngredient') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.activeIngredient') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.activeIngredient'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.activeIngredient")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.strength")}
                    name="vn_warehouses.strength"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.strength') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.strength') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.strength'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.strength")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.form")}
                    name="vn_warehouses.form"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.company') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.form') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.form'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.form")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.package")}
                    name="vn_warehouses.package"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.package') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.fpackageorm') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.package'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.package")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.unit")}
                    name="vn_warehouses.unit"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.unit') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.unit') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.unit'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.unit")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.company")}
                    name="vn_warehouses.company"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.company') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.company') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.company'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.company")} />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    label={t("pages:vn_warehouses.form.registerCode")}
                    name="vn_warehouses.registerCode"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.registerCode') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_warehouses.form.registerCode') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_warehouses.form.registerCode'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_warehouses.form.registerCode")} />
                </Form.Item>
            </Col>
        </Row>

    </>)
}

export default FormSearch;
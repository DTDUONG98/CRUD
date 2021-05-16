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
                    label={t("pages:vn_raw_datas.form.name")}
                    name="vn_raw_datas.name"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.name') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.name') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.name'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.name")} />
                </Form.Item>
            </Col>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.activeIngredient")}
                    name="vn_raw_datas.activeIngredient"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.activeIngredient') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.activeIngredient') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.activeIngredient'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.activeIngredient")} />
                </Form.Item>
            </Col>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.strength")}
                    name="vn_raw_datas.strength"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.strength') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.strength') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.strength'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.strength")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
        <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.form")}
                    name="vn_raw_datas.form"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.company') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.form') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.form'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.form")} />
                </Form.Item>
            </Col>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.package")}
                    name="vn_raw_datas.package"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.package') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.fpackageorm') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.package'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.package")} />
                </Form.Item>
            </Col>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.unit")}
                    name="vn_raw_datas.unit"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.unit') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.unit') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.unit'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.unit")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.company")}
                    name="vn_raw_datas.company"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.company') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.company') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.company'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.company")} />
                </Form.Item>
            </Col>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.registerCode")}
                    name="vn_raw_datas.registerCode"
                    rules={[
                        // { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.registerCode') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.registerCode') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.registerCode'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.registerCode")} />
                </Form.Item>
            </Col>
            {/* <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.name")}
                    name="name"
                    rules={[
                        { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.name') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.name') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.name'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.name")} />
                </Form.Item>
            </Col>
            <Col md={8}>
                <Form.Item
                    label={t("pages:vn_raw_datas.form.name")}
                    name="name"
                    rules={[
                        { required: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.name') }) },
                        { whitespace: true, message: t('messages:form.required', { name: t('pages:vn_raw_datas.form.name') }) },
                        { max: 255, message: t('messages:form.maxLength', { name: t('pages:vn_raw_datas.form.name'), length: 255 }) }
                    ]}
                >
                    <Input placeholder={t("pages:vn_raw_datas.form.name")} />
                </Form.Item>
            </Col> */}
        </Row>

    </>)
}

export default FormSearch;
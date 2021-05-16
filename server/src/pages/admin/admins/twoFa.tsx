import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import { Button, Form, Col, Row, Switch, Input } from 'antd';
import adminService from '@src/services/adminService';
import to from 'await-to-js'
import useBaseHook from '@src/hooks/BaseHook'
import { LeftCircleFilled, SaveFilled } from '@ant-design/icons';
import auth from '@src/helpers/auth'

const TwoFA = () => {
  const { t, notify, router } = useBaseHook();
  const [loading, setLoading] = useState(false);
  const [otpData, setOtpData] = useState<any>({});
  const [OTP, setOTP] = useState("")
  const [enable, setEnable] = useState(false);
  const [alreadyEnable, setAlreadyEnable] = useState(false);

  const fetchData = async () => {
    let idError: any = null;

    if (idError) return notify(t(`errors:${idError.code}`), '', 'error')
    let [adminError, admin]: [any, Admin] = await to(adminService().withAuth().detail({ id: auth().user.id }));
    if (adminError) return notify(t(`errors:${adminError.code}`), '', 'error')
    setAlreadyEnable(admin.twofaSecret != null)
    setEnable(admin.twofaSecret != null);
  }

  const generateOTP = async () => {
    if (!enable || alreadyEnable) return;
    let [error, otpData]: [any, Admin] = await to(adminService().withAuth().generateOTP());
    setOtpData(otpData || {});
  }

  const onFinish = async () => {
    setLoading(true)
    let [error, result]: [any, Admin] = await to(adminService().withAuth().submitOTP({
      enable: enable,
      secret: otpData.base32,
      otp: OTP
    }));

    if (error) {
      setLoading(false)
      notify(t(`errors:${error.code}`), '', 'error')
      return;
    }
    notify(t("messages:message.enable2FaSuccess"))
    auth().logout()
    window.location.reload();
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    generateOTP()
  }, [enable]);

  const renderForm = () => {
    if (!enable || alreadyEnable) return <></>
    return <div>
      <Form.Item
        wrapperCol={{ span: 24 }}
        label={t("pages:admins.form.qrcode")}
      >
        <img src={otpData.qrcode} height="200" />
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 24 }}
        label={t("pages:admins.form.enterCode")}
      >
        <Input onChange={(e) => setOTP(e.target.value)} value={OTP} />
      </Form.Item>
    </div>
  }

  return <>
    <div className="content">
      <div>
        {alreadyEnable ? t("pages:admins.twofa.enabledAlready") : t("pages:admins.twofa.notEnable")}
      </div>
      <Form
        name="createAdmin"
        layout="horizontal"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          wrapperCol={{ span: 24 }}
          label={t("pages:admins.form.enable2fa")}
          valuePropName="checked"
        >
          <Switch onChange={(checked) => setEnable(checked)} checked={enable} />
        </Form.Item>
        {renderForm()}
        <Row>
          <Col md={{ span: 16, offset: 4 }}>
            <Form.Item wrapperCol={{ span: 24 }} className="text-center">
              <Button onClick={() => router.back()} className="btn-margin-right">
                <LeftCircleFilled /> {t('buttons:back')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} disabled={alreadyEnable && enable} className="btn-margin-right">
                <SaveFilled /> {t('buttons:submit')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <div className="download">
          <span>{t("pages:admins.twofa.link.title")}</span>
          <br/>
          <span>{t("pages:admins.twofa.link.link")}</span>
          <br/>
          <div className="icon">
            <a href={t("pages:admins.twofa.link.ios")} target="_blank" className="btn-margin-right">
              <img src="/images/appstore.webp" title="Link Download Appstore" />
            </a>
            <a href={t("pages:admins.twofa.link.android")} target="_blank">
              <img src="/images/googleplay.webp" title="Link Download Android" />
            </a>
          </div>
        </div>
      </Form>
    </div>
  </>
}

TwoFA.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t("pages:admins.twofa.title")}
    description={t("pages:admins.twofa.description")}
    {...props}
  />
}

TwoFA.permissions = {
  "twofa": "U"
}

export default TwoFA

import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('@src/layouts/Admin'), { ssr: false })
import useBaseHook from '@src/hooks/BaseHook';
import usePermissionHook from "@src/hooks/PermissionHook";
import { Row, Col } from 'antd'
import ChartRequest from '@src/components/Admin/Dashboard/ChartRequest';
import ChartAvgTime from '@src/components/Admin/Dashboard/ChartAvgTime';
import ChartStatus from '@src/components/Admin/Dashboard/ChartStatus';
import ChartTimes from '@src/components/Admin/Dashboard/ChartTimes';
import TableTimes from '@src/components/Admin/Dashboard/TableTimes';

const Dashboard = () => {
  const { checkPermission } = usePermissionHook();
  const { redirect } = useBaseHook();
  const dashboardPer = checkPermission({
    "dashboard": "R"
  })
  if (!dashboardPer) {
    redirect("frontend.admin.admins.index")
    return <></>
  }

  const statisticPer = checkPermission({
    "statisticRequest": "R"
  })

  return <>
    <div className="content">
      <div className="dashboard">
        <div className="chart">
          <ChartTimes />
        </div>
        <div className="table-statistic">
          <TableTimes />
        </div>
        {statisticPer ? (
          <Row>
            <Col md={12}>
              <div className="chart">
                <ChartRequest />
              </div>
            </Col>
            <Col md={12}>
              <div className="chart">
                <ChartAvgTime />
              </div>
            </Col>
          </Row>
        ) : null}
        <div className="chart">
          <ChartStatus />
        </div>
      </div>
    </div>
  </>
}

Dashboard.Layout = (props) => {
  const { t } = useBaseHook();
  return <Layout
    title={t('pages:dashboard.index.title')}
    description={t('pages:dashboard.index.description')}
    {...props}
  />
}

export default Dashboard

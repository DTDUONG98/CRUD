import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getReportProjectPending,
    getReportProjectSuccess,
    getReportProjectError,
} from "../modules/report-project/report-project.action";
import axios from 'axios';
import _ from 'lodash';

export const getReport = (startDate, endDate) => async dispatch => {
  dispatch(getReportProjectPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}reports/projects`, {
        body: {
            startDate: startDate,
            endDate: endDate
        }
    });
    const {data} = _.get(response,'data.data', []);
    dispatch(getReportProjectSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getReportProjectError(error.response.status));
    }
  }
};

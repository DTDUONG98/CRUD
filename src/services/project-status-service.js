import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getProjectStatusPending,
    getProjectStatusSuccess,
    getProjectStatusError,
} from "../modules/project-status/project-status.actions";
import axios from 'axios';
import _ from 'lodash';

export const getProjectStatus = (page) => async dispatch => {
  dispatch(getProjectStatusPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}project_status?page=${page-1}&pageSize=5`);
    const {data} = _.get(response,'data.data', []);
    const {total} = _.get(response, 'data.data',[]);
    dispatch(getProjectStatusSuccess(data, total));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getProjectStatusError(error.response.status));
    }
  }
};

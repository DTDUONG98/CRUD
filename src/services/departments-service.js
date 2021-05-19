import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getDepartmentPending,
    getDeparrtmentSuccess,
    getDepartmentError,
} from "../modules/departments/departments.actions";
import axios from 'axios';
import _ from 'lodash';

export const getDepartment = (page) => async dispatch => {
  dispatch(getDepartmentPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}departments?page=${page-1}&pageSize=5`);
    const {data} = _.get(response,'data.data', []);
    dispatch(getDeparrtmentSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getDepartmentError(error.response.status));
    }
  }
};

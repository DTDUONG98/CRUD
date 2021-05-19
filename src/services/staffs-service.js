import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getStaffsPending,
    getStaffsSuccess,
    getStaffsError,
} from "../modules/staffs/staffs.actions";
import axios from 'axios';
import _ from 'lodash';

export const getStaffs = (page) => async dispatch => {
  dispatch(getStaffsPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}staffs?page=${page-1}&pageSize=5`);
    const {data} = _.get(response,'data.data', []);
    dispatch(getStaffsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getStaffsError(error.response.status));
    }
  }
};

import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
  getCustomersError,
  getCustomersPending,
  getCustomersSuccess,
} from "../modules/customer-group/customer-group.actions";
import axios from 'axios';
import _ from 'lodash';

export const getCustomers = (page) => async dispatch => {
  dispatch(getCustomersPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}customer_groups?page=${page-1}&pageSize=5`);
    const {data} = _.get(response,'data.data', []);
    dispatch(getCustomersSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getCustomersError(error.response.status));
    }
  }
};

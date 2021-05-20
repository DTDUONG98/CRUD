import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getTechStackPending,
    getTechStackSucess,
    getTechStackError,
} from "../modules/tech-stack/tech-stack.actions";
import axios from 'axios';
import _ from 'lodash';

export const getTechStack = (page, pageSize) => async dispatch => {
  dispatch(getTechStackPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}tech_stacks?page=${page-1}&pageSize=${pageSize}`);
    const {data} = _.get(response,'data.data', []);
    dispatch(getTechStackSucess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getTechStackError(error.response.status));
    }
  }
};

import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getProjectsPending,
    getProjectsSuccess,
    getProjectsError,
} from "../modules/projects/projects.actions";
import axios from 'axios';
import _ from 'lodash';

export const getProjects = (page) => async dispatch => {
  dispatch(getProjectsPending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}projects?page=${page-1}&pageSize=5`);
    const {data} = _.get(response,'data.data', []);
    dispatch(getProjectsSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getProjectsError(error.response.status));
    }
  }
};

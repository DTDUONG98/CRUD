import { REACT_APP_BASE_URL } from "../routers/router.type";
import {
    getProjectTypePending,
    getProjectTypeSucess,
    getProjectTypeError,
    detailProjectTypePending,
    detailProjectTypeSuccess,
    detailProjectTypeError,
} from "../modules/project-type/project-type.actions";
import axios from 'axios';
import _ from 'lodash';

export const getProjectType = (page) => async dispatch => {
  dispatch(getProjectTypePending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}project_types?page=${page-1}&pageSize=5`);
    const {data} = _.get(response,'data.data', []);
    dispatch(getProjectTypeSucess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(getProjectTypeError(error.response.status));
    }
  }
};

export const DetailProjectType = (params) => async dispatch => {
  dispatch(detailProjectTypePending());
  try {
    const response = await axios.get(`${REACT_APP_BASE_URL}project_types/${params.id}`);
    const {data} = _.get(response,'data.data', []);
    dispatch(detailProjectTypeSuccess(data));
  }
  catch (error) {
    if (error.response.status) {
      dispatch(detailProjectTypeError(error.response.status));
    }
  }
};

import * as CONSTANS from "./project-type.constants";

export const getProjectTypePending = () => {
  return {
    type: CONSTANS.GET_PROJECT_TYPE_PENDING,
  };
};
export const getProjectTypeSucess = data => {
  return {
    type: CONSTANS.GET_PROJECT_TYPE_SUCCESS,
    payload: data,
  };
};
export const getProjectTypeError = error => {
  return {
    type: CONSTANS.GET_PROJECT_TYPE_ERROR,
    error,
  };
};
export const detailProjectTypePending = () => {
  return {
    type: CONSTANS.DETAIL_PROJECT_TYPE_PENDING,
  };
};
export const detailProjectTypeSuccess = data => {
  return {
    type: CONSTANS.DETAIL_PROJECT_TYPE_SUCCESS,
    payload: data,
  };
};
export const detailProjectTypeError = error => {
  return {
    type: CONSTANS.DETAIL_PROJECT_TYPE_ERROR,
    error,
  };
};

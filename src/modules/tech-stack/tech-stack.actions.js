import * as CONSTANS from "./tech-stack.constant";

export const getTechStackPending = () => {
  return {
    type: CONSTANS.GET_TECH_STACK_PENDING,
  };
};
export const getTechStackSucess = (data, total) => {
  return {
    type: CONSTANS.GET_TECH_STACK_SUCCESS,
    payload: data,
    total: {
      total,
    }
  };
};
export const getTechStackError = error => {
  return {
    type: CONSTANS.GET_TECH_STACK_ERROR,
    error,
  };
};

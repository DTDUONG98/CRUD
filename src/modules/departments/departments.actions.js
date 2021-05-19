import * as CONSTANT from './department.constant';


export const getDepartmentPending = () => {
    return {
        type: CONSTANT.GET_DEPARTMENT_PENDING,
    }
}

export const getDeparrtmentSuccess = (data) => {
    return {
        type: CONSTANT.GET_DEPARTMENT_SUCCESS,
        payload: {
            data,
        },
    }
}

export const getDepartmentError = (error) => {
    return {
        type: CONSTANT.GET_DEPARTMENT_ERROR,
        payload: {
            error,
        },
    }
}
import * as CONSTANT from './staffs.constant';


export const getStaffsPending = () => {
    return {
        type: CONSTANT.GET_STAFFS_PENDING,
    }
}

export const getStaffsSuccess = (data) => {
    return {
        type: CONSTANT.GET_STAFFS_SUCCESS,
        payload: {
            data,
        },
    }
}

export const getStaffsError = (error) => {
    return {
        type: CONSTANT.GET_STAFFS_ERROR,
        payload: {
            error,
        },
    }
}
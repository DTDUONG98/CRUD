import * as CONSTANT from './staffs.constant';


export const getStaffsPending = () => {
    return {
        type: CONSTANT.GET_STAFFS_PENDING,
    }
}

export const getStaffsSuccess = (data, total) => {
    return {
        type: CONSTANT.GET_STAFFS_SUCCESS,
        payload: {
            data,
        },
        total: {
            total,
        }
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
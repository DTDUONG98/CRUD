import * as projectStatus from './project-status.constant';


export const getProjectStatusPending = () => {
    return {
        type: projectStatus.GET_PROJECT_STATUS_PENDING,
    }
}

export const getProjectStatusSuccess = (data, total) => {
    return {
        type: projectStatus.GET_PROJECT_STATUS_SUCCESS,
        payload: {
            data,
        },
        total: {
            total,
        }
    }
}

export const getProjectStatusError = (error) => {
    return {
        type: projectStatus.GET_PROJECT_STATUS_ERROR,
        payload: {
            error,
        },
    }
}
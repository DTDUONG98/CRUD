import * as CONSTANT from './projects.constant';


export const getProjectsPending = () => {
    return {
        type: CONSTANT.GET_PROJECTS_PENDING,
    }
}

export const getProjectsSuccess = (data, total) => {
    return {
        type: CONSTANT.GET_PROJECTS_SUCCESS,
        payload: {
            data,
        },
        total: {
            total,
        }
    }
}

export const getProjectsError = (error) => {
    return {
        type: CONSTANT.GET_PROJECTS_ERROR,
        payload: {
            error,
        },
    }
}
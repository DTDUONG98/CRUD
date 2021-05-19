import * as CONSTANT from './projects.constant';


export const getProjectsPending = () => {
    return {
        type: CONSTANT.GET_PROJECTS_PENDING,
    }
}

export const getProjectsSuccess = (data) => {
    return {
        type: CONSTANT.GET_PROJECTS_SUCCESS,
        payload: {
            data,
        },
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
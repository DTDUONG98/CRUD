import * as CONSTANT from './report-project.constant';

export const getReportProjectPending = () => {
    return {
        type: CONSTANT.GET_REPORT_PROJECT_PENDING,
    }
}

export const getReportProjectSuccess = (data) => {
    return {
        type: CONSTANT.GET_REPORT_PROJECT_SUCCESS,
        payload: {
            data,
        },
    }
}

export const getReportProjectError = (error) => {
    return {
        type: CONSTANT.GET_REPORT_PROJECT_ERROR,
        payload: {
            error,
        },
    }
}
import * as report from './report-project.constant'

const initialState = {
    data: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case report.GET_REPORT_PROJECT_PENDING: {
            return {
                ...state,
                data: [],
                loading: true
            }
        }
        case report.GET_REPORT_PROJECT_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        case report.GET_REPORT_PROJECT_ERROR: {
            return {
                ...state,
                data: [],
                loading : false
            }
        }
        default: 
        return state;
    }
}

export default reducer;
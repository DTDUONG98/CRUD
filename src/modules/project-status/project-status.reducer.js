import * as projectStatus from './project-status.constant'

const initialState = {
    data: [],
    total: 0,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case projectStatus.GET_PROJECT_STATUS_PENDING: {
            return {
                ...state,
                data: [],
                total: 0,
                loading: true
            }
        }
        case projectStatus.GET_PROJECT_STATUS_SUCCESS: {
            const { data } = action.payload;
            const { total } = action.total;
            return {
                ...state,
                data: data,
                total: total,
                loading: false
            }
        }
        case projectStatus.GET_PROJECT_STATUS_ERROR: {
            return {
                ...state,
                data: [],
                total: 0,
                loading : false
            }
        }
        default: 
        return state;
    }
}

export default reducer;
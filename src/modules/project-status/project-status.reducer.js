import * as projectStatus from './project-status.constant'

const initialState = {
    data: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case projectStatus.GET_PROJECT_STATUS_PENDING: {
            return {
                ...state,
                data: [],
                loading: true
            }
        }
        case projectStatus.GET_PROJECT_STATUS_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        case projectStatus.GET_PROJECT_STATUS_ERROR: {
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
import * as projects from './projects.constant'

const initialState = {
    data: [],
    total: 0,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case projects.GET_PROJECTS_PENDING: {
            return {
                ...state,
                data: [],
                total: 0,
                loading: true
            }
        }
        case projects.GET_PROJECTS_SUCCESS: {
            const { data } = action.payload;
            const { total } = action.total;
            return {
                ...state,
                data: data,
                total: total,
                loading: false
            }
        }
        case projects.GET_PROJECTS_ERROR: {
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
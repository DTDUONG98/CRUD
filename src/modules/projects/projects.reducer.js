import * as projects from './projects.constant'

const initialState = {
    data: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case projects.GET_PROJECTS_PENDING: {
            return {
                ...state,
                data: [],
                loading: true
            }
        }
        case projects.GET_PROJECTS_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        case projects.GET_PROJECTS_ERROR: {
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
import * as department from './department.constant'

const initialState = {
    data: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case department.GET_DEPARTMENT_PENDING: {
            return {
                ...state,
                data: [],
                loading: true
            }
        }
        case department.GET_DEPARTMENT_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        case department.GET_DEPARTMENT_ERROR: {
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
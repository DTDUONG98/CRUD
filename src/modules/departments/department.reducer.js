import * as department from './department.constant'

const initialState = {
    data: [],
    total: 0,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case department.GET_DEPARTMENT_PENDING: {
            return {
                ...state,
                data: [],
                total: 0,
                loading: true
            }
        }
        case department.GET_DEPARTMENT_SUCCESS: {
            const { data } = action.payload;
            const { total } = action.total
            return {
                ...state,
                data: data,
                total: total,
                loading: false
            }
        }
        case department.GET_DEPARTMENT_ERROR: {
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
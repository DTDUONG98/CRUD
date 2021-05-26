import * as staffs from './staffs.constant'

const initialState = {
    data: [],
    total: 0,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case staffs.GET_STAFFS_PENDING: {
            return {
                ...state,
                data: [],
                total: 0,
                loading: true
            }
        }
        case staffs.GET_STAFFS_SUCCESS: {
            const { data } = action.payload;
            const { total } = action.total;
            return {
                ...state,
                data: data,
                total: total,
                loading: false
            }
        }
        case staffs.GET_STAFFS_ERROR: {
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
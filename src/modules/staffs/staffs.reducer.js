import * as staffs from './staffs.constant'

const initialState = {
    data: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case staffs.GET_STAFFS_PENDING: {
            return {
                ...state,
                data: [],
                loading: true
            }
        }
        case staffs.GET_STAFFS_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        case staffs.GET_STAFFS_ERROR: {
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
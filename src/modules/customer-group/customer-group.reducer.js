import * as customer from './customer-group.constant'

const initialState = {
    data: [],
    total: 0,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case customer.GET_CUSTOMER_GROUP_PENDING: {
            return {
                ...state,
                data: [],
                total: 0,
                loading: true
            }
        }
        case customer.GET_CUSTOMER_GROUP_SUCCESS: {
            const { data } = action.payload;
            const { total } = action.total
            return {
                ...state,
                data: data,
                total:total,
                loading: false
            }
        }
        case customer.GET_CUSTOMER_GROUP_ERROR: {
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
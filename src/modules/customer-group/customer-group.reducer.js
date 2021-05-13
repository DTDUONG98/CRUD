import * as customer from './customer-group.constant'

const initialState = {
    data: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case customer.GET_CUSTOMER_GROUP_PENDING: {
            return {
                ...state,
                data: [],
            }
        }
        case customer.GET_CUSTOMER_GROUP_SUCCESS: {
            const { data } = action.payload;
            console.log('data', data)
            return {
                ...state,
                data: data,
            }
        }
        case customer.GET_CUSTOMER_GROUP_ERROR: {
            return {
                ...state,
                data: [],
            }
        }
        default: 
        return state;
    }
}

export default reducer;
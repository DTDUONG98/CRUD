import * as CustomerType from './customer-group.constant';


export const getCustomersPending = () => {
    return {
        type: CustomerType.GET_CUSTOMER_GROUP_PENDING,
    }
}

export const getCustomersSuccess = (data, total) => {
    return {
        type: CustomerType.GET_CUSTOMER_GROUP_SUCCESS,
        payload: {
            data,
        },
        total: {
            total,
        }
    }
}

export const getCustomersError = (error) => {
    return {
        type: CustomerType.GET_CUSTOMER_GROUP_ERROR,
        payload: {
            error,
        },
    }
}
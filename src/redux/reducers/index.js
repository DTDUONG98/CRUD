import { combineReducers } from 'redux';
import customerReducer from '../../modules/customer-group/customer-group.reducer';

const rootReducer = combineReducers({
    customer: customerReducer,
});

export default rootReducer;
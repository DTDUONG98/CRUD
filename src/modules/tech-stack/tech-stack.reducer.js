import * as techStack from "./tech-stack.constant";

const initialState = {
  loading: true,
  total: 0,
  data: [],
};
const reducer = (state = initialState, action) => {
  switch(action.type){
      case techStack.GET_TECH_STACK_PENDING: {
          return {
              ...state,
              data: [],
              total: 0,
              loading: true
          }
      }
      case techStack.GET_TECH_STACK_SUCCESS: {
        const { total } = action.total
          return {
              ...state,
              data: action.payload,
              total: total,
              loading: false
          }
      }
      case techStack.GET_TECH_STACK_ERROR: {
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

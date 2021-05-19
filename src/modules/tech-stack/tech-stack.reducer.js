import * as techStack from "./tech-stack.constant";

const initialState = {
  loading: true,
  data: [],
};
const reducer = (state = initialState, action) => {
  switch(action.type){
      case techStack.GET_TECH_STACK_PENDING: {
          return {
              ...state,
              data: [],
              loading: true
          }
      }
      case techStack.GET_TECH_STACK_SUCCESS: {


          return {
              ...state,
              data: action.payload,
              loading: false
          }
      }
      case techStack.GET_TECH_STACK_ERROR: {
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

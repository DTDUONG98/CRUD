import produce from "immer";
import * as CONSTANS from "./project-type.constants";
const initialState = {
  loading: false,
  data: [],
};
export const projectTypeReducer = (state = initialState, action) => {
  return produce(state, draftState => {
    switch (action.type) {
      case CONSTANS.GET_PROJECT_TYPE_PENDING:
        draftState.loading = true;
        break;
      case CONSTANS.GET_PROJECT_TYPE_SUCCESS: {
        draftState.numberDoc = action.payload.totalDoc;
        draftState.startIndex = action.payload.startIndex;
        const convertData = action.payload.record.map(item => {
          return { ...item, index: action.payload.startIndex++ };
        });
        draftState.data = convertData;
        draftState.loading = false;
        break;
      }
      default:
        return state;
    }
  });
};

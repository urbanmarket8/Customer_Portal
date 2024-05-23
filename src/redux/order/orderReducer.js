import {
  SHOW_ORDER,
} from "./orderType";

const initialState = {
  order: [],
  showOrder: false,
};
const orderReducer = (state = initialState, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case SHOW_ORDER:
      return {
        ...state,
        showOrder: !state.showOrder,
      };
    default:
      return state;
  }
};
export default orderReducer;

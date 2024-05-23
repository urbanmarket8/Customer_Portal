import {
  ADD_CART,
  DECREASE_CART,
  INCREASE_CART,
  REMOVE_CART,
  SHOW_CART,
  SHOW_CHECKOUT,
} from "./cartType";

const initialState = {
  cart: [],
  total: 0,
  showCart: false,
  showCheck: false,
};
const cartReducer = (state = initialState, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case SHOW_CART:
      return {
        ...state,
        showCart: !state.showCart,
      };
    case SHOW_CHECKOUT:
      return {
        ...state,
        showCheck: !state.showCheck,
        showCart: false,
      };
    case ADD_CART:
      return {
        ...state,
        cart: [{ ...action.payload, quantity: 1 }, ...state.cart],
        total: state.total + action.price,
      };
    case INCREASE_CART:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === action.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
        total: state.total + action.quantity * action.price,
      };
    case DECREASE_CART:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === action.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
        total: state.total - action.price * (action.quantity - 1),
      };
    case REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.id),
        total: state.total - action.price * action.quantity,
      };
    default:
      return state;
  }
};
export default cartReducer;

import {
  INCREASE_COUNT,
  DECREASE_COUNT,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./productType";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };
    case FETCH_DATA_FAILURE:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    case INCREASE_COUNT:
      return {
        ...state,
        products: state.products.map((item) => {
          if (item._id === action.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case DECREASE_COUNT:
      return {
        ...state,
        products: state.products.map((item) => {
          if (item._id === action.id && action.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return { ...item, quantity: item.quantity };
          }
        }),
      };
    default:
      return state;
  }
};

export default productReducer;

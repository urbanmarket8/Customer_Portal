import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import orderReducer from "./order/orderReducer";
import FilterReducer from "./filter/filterReducer";
import ProductReducer from "./product/productReducer";

const rootReducer = combineReducers({
  product: ProductReducer,
  filter: FilterReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;

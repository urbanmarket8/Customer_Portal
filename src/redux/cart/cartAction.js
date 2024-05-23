import {
  ADD_CART,
  REMOVE_CART,
  DECREASE_CART,
  INCREASE_CART,
  SHOW_CART,
  SHOW_CHECKOUT,
} from "./cartType";
import { addToCartApi, deleteFromCartApi } from "../../services/api/cart";

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      const response = await addToCartApi(product);
      dispatch({
        type: ADD_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
};

export const removeFromCart = (productId) => {
  return async (dispatch) => {
    try {
      const response = await deleteFromCartApi({ "_id": productId });
      dispatch({
        type: REMOVE_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
};
export const increaseCartQuantity = (id, quantity, price) => {
  console.log("increaseCartQuantity");
  console.log(increaseCartQuantity);
  return {
    type: INCREASE_CART,
    id,
    quantity,
    price,
  };
};
export const decreaseCartQuantity = (id, quantity, price) => {
  return {
    type: DECREASE_CART,
    id,
    quantity,
    price,
  };
};
export const removeCart = (id, quantity, price) => {
  return {
    type: REMOVE_CART,
    id,
    quantity,
    price,
  };
};
export const showCart = () => {
  return {
    type: SHOW_CART,
  };
};
export const ShowCheck = () => {
  return {
    type: SHOW_CHECKOUT,
  };
};

export const RemoveCart = (id, quantity, price) => {
  return async (dispatch) => {
    try {
      const response = await deleteFromCartApi(id);
      dispatch({
        type: REMOVE_CART,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
};

import { CHECK_SESS, PLACE_ORDER, SHOW_ORDER } from "./orderType";
import { checkOutSession, placeOrderApi } from "../../services/api/order";

export const PlaceOrder = (formData) => {
  return async (dispatch) => {
    try {
      console.log("In Place Order");
      const response = await placeOrderApi(formData);
      dispatch({
        type: PLACE_ORDER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error place order:", error);
    }
  };
};

export const checkOutSess = (formData) => {
  return async (dispatch) => {
    try {
      console.log("In Place Order");
      const response = await checkOutSession(formData);
      dispatch({
        type: CHECK_SESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error place order:", error);
    }
  };
};
export const showOrder = () => {
  return {
    type: SHOW_ORDER,
  };
};

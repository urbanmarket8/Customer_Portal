import { PLACE_ORDER, ALL_ORDERS, CHECKOUT_SESSION } from "../url";
import request from "../axios";

export const listOrderApi = async () => {
  return request.get(ALL_ORDERS);
};

export const placeOrderApi = async (payload) => {
  console.log(payload);
  return request.post(PLACE_ORDER, payload);
};

export const checkOutSession = async (payload) => {
  console.log(payload);
  return request.post(CHECKOUT_SESSION, payload);
};

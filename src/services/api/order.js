import { PLACE_ORDER, ALL_ORDERS } from "../url";
import request from "../axios";


export const listOrderApi = async () => {
    return request.get(ALL_ORDERS);
};

export const placeOrderApi = async (payload) => {
    return request.post(PLACE_ORDER, payload);
};
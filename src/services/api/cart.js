import { LIST_CART, ADD_TO_CART, DELETE_FROM_CART } from "../url";
import request from "../axios";


export const listCartApi = async () => {
    return request.get(LIST_CART);
};

export const addToCartApi = async (payload) => {
    const values = {
        ...payload,
    };

    return request.post(ADD_TO_CART, values);
};

export const deleteFromCartApi = async (id) => {
    return request.delete(`${DELETE_FROM_CART}/${id}`);
};
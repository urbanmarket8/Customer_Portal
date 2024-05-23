import request from "../axios";
import { LIST_PRODUCTS, LIST_SHOPS } from "../url";

function getLocation() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });
}

const getCurrentPosition = async () => {
  try {
    const position = await getLocation();
    const { longitude, latitude } = position?.coords || {};
    return {
      longitude,
      latitude,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const listProductsApi = async (payload) => {
  let values = {
    ...payload,
    limit: 50,
  };
  return request.post(LIST_PRODUCTS, values);
};

export const listShopsApi = async () => {
  return request.get(LIST_SHOPS);
};

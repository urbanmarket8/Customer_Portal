import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  INCREASE_COUNT,
  DECREASE_COUNT,
} from "./productType";

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

export const IncreaseCount = (id, quantity) => {
  return {
    type: INCREASE_COUNT,
    id,
    quantity,
  };
};
export const DecreseCount = (id, quantity) => {
  return {
    type: DECREASE_COUNT,
    id,
    quantity,
  };
};

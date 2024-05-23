import { SET_FILTER, SET_IS_FILTER_CHANGED } from "./filterType";

export const setFilters = (filters) => {
  return {
    type: SET_FILTER,
    filters,
  };
};

export const setIsFiltersChanged = () => {
  return {
    type: SET_IS_FILTER_CHANGED,
  };
};

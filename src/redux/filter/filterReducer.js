import { SET_FILTER, SET_IS_FILTER_CHANGED } from "./filterType";

const initialState = {
  filters: {
    searchText: "",
    category: "",
    shopId: "",
    Nearby: false,
    page: 1,
  },
  isFilterChanged: true,
};

const FilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ...action.filters },
        isFilterChanged: true,
      };
    case SET_IS_FILTER_CHANGED:
      return {
        ...state,
        isFilterChanged: false,
      };
    default:
      return state;
  }
};

export default FilterReducer;

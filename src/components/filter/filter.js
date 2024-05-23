import { connect } from "react-redux";
import "./style.css";
import { setFilters } from "../../redux/filter/filterAction";
import { IoMdClose } from "react-icons/io";

const Filter = ({ filters, filterItem, shops, onClose, isSideBarShown }) => {
  return (
    <div className={isSideBarShown ? "filterSidBar open" : "filterSidBar"}>
      <div className="p-3">
        {isSideBarShown && (
          <div className="header">
            <h5>SIDEBAR</h5>
            <IoMdClose onClick={onClose} style={{ cursor: "pointer" }} />
          </div>
        )}
        <ul className="filter-list">
          <h5>CATEGORIES</h5>
          {[
            "Electronics",
            "Clothing",
            "Books",
            "Home Goods",
            "Groceries",
            "Vegetables",
            "Fruits",
          ]?.map((category, index) => (
            <li
              key={index}
              className={
                filters?.category === category
                  ? "filter-link active"
                  : "filter-link"
              }
              onClick={() => filterItem({ category })}
            >
              {category}
            </li>
          ))}
        </ul>
        <ul className="filter-list">
          <h5>NEARBY SHOPS</h5>
          {shops?.map((shop, index) => (
            <li
              key={index}
              className={
                filters?.shopId === shop?._id
                  ? "filter-link active"
                  : "filter-link"
              }
              onClick={() => filterItem({ shopId: shop?._id })}
            >
              {shop?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterItem: (filter) => dispatch(setFilters(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

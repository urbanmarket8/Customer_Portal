import React from "react";
import logo from "../../logo-default-231x49.png";
import { connect } from "react-redux";
import Cart from "../cart/cart";
import Order from "../order/order";
import { showCart } from "../../redux/cart/cartAction";
import { showOrder } from "../../redux/order/orderAction";
import "./style.css";
import CheckOut from "./../check-out/checkOut";
import { FaSearch } from "react-icons/fa";

import { Badge, ButtonGroup, Container } from "react-bootstrap";
import ReactNavbar from "react-bootstrap/Navbar";
import { FaCartShopping, FaUser, FaClipboard } from "react-icons/fa6";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from "js-cookie";
import Text from "../inputs/Text";
import { setFilters } from "../../redux/filter/filterAction";
import { useQuery } from "../../services/queries/useQuery"
import { listCartApi } from "../../services/api/cart";
import { listOrderApi } from "../../services/api/order";

const Navbar = (props) => {
  const currentUser = Cookies.get("at");
  const { data: listCartsQuery } = useQuery(listCartApi);
  const { data: listOrdersApi } = useQuery(listOrderApi);
  const item = listCartsQuery?.cart?.items?.length;
  const orders_counts = listOrdersApi?.count;

  return (
    <ReactNavbar bg="light" data-bs-theme="light" className="bg-body-tertiary">
      <Container fluid className="pl-5 pr-5 mr-5">
        <ReactNavbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          {"Bazaar"}
        </ReactNavbar.Brand>
        <ReactNavbar.Collapse className="justify-content-center">
          <div className="search">
            <FaSearch />
            <Text
              placeholder="Search for products..."
              className="pl-5"
              onChange={(e) => props.filterItem({ searchText: e.target.value })}
              value={props.filters?.searchText || ""}
            />
          </div>
        </ReactNavbar.Collapse>

        <ReactNavbar.Collapse className="justify-content-end">
          <div className="cart " onClick={props.ShowCart}>
            <FaCartShopping className="cart-icon" />
            <Badge pill className="number-of-items" bg="light">
              {item}
            </Badge>
          </div>
          <div className="cart " onClick={props.ShowOrder}>
            <FaClipboard className="cart-icon" />
            <Badge pill className="number-of-items" bg="light">
              {orders_counts}
            </Badge>
          </div>
          <DropdownButton
            as={ButtonGroup}
            title={<FaUser />}
            className="user"
            drop="start"
            key={"start"}
            id={`dropdown-button-drop-start`}
          >
            {!currentUser && <Dropdown.Item href="/login">Login</Dropdown.Item>}
            {currentUser && (
              <Dropdown.Item href="/logout">log out</Dropdown.Item>
            )}
          </DropdownButton>
        </ReactNavbar.Collapse>
        {props.show && <Cart />}
        {props.showOrder && <Order />}
        {props.showCheck && <CheckOut />}
      </Container>
    </ReactNavbar>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    show: state.cart.showCart,
    showOrder: state.order.showOrder,
    showCheck: state.cart.showCheck,
    filters: state.filter.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShowCart: () => dispatch(showCart()),
    ShowOrder: () => dispatch(showOrder()),

    filterItem: (filter) => dispatch(setFilters(filter)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

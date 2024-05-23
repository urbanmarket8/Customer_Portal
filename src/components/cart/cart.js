import { useQuery } from "../../services/queries/useQuery";
import { connect } from "react-redux";
import { showCart, ShowCheck } from "../../redux/cart/cartAction";
import { listCartApi } from "../../services/api/cart";
import { IoMdClose } from "react-icons/io";

import "./style.css";
import Button from "../Button";

const Cart = ({ showCart, ShowCheck }) => {
  const { data: listCartsQuery } = useQuery(listCartApi);
  return (
    <section className="cart">
      <div className="pop-up">
        <div className="cart-content">
          <div className="d-block text-right mb-3 mr-2">
            <IoMdClose onClick={showCart} style={{ cursor: "pointer" }} />
          </div>
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>product name</th>
                  <th>price</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                {listCartsQuery != null &&
                  listCartsQuery?.cart?.items?.map((m) => {
                    return (
                      <tr>
                        <td>
                          <div className="cart-body">
                            <div className="cart-image">
                              <img src={"https://api.vtbazaar.net/" + m.product.image} alt="cart" />
                            </div>
                            <h4>{m.product.name}</h4>
                          </div>
                        </td>
                        <td> {"₹ " + m.product.price + ".00"}</td>
                        <td>
                          <div className="cart-quantity">
                            <span className="quantity">{m.quantity}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="check-out">
              <div className="text-left">
                <span className="total-span">total: </span>
                <span className="price-span">
                  {`₹${listCartsQuery?.totalPrice ?? 0}.00`}
                </span>
              </div>
              <div className="text-right">
                <Button
                  className="cart-button check-out-button "
                  onClick={ShowCheck}
                >
                  proceed to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    total: state.cart.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showCart: () => dispatch(showCart()),
    ShowCheck: () => dispatch(ShowCheck()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

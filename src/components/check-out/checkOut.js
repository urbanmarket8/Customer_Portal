import React, { useState } from "react";
import { connect } from "react-redux";
import "./style.css";
import { useDispatch } from "react-redux";
import { PlaceOrder } from "../../redux/order/orderAction";
import { IoMdClose } from "react-icons/io";

const CheckOut = () => {
  const [showCheckout, setShowCheckout] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "", // New state for payment method
  });
  const [errors, setErrors] = useState({}); // State to manage form validation errors

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the validation error message when user starts typing in the input field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleClick = (e) => {
    setShowCheckout(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.paymentMethod.trim()) {
      validationErrors.paymentMethod = "Payment Method is required";
    }

    // If there are validation errors, set them in the state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If no validation errors, dispatch the PlaceOrder action
    dispatch(PlaceOrder(formData));
    setShowCheckout(false);
  };

  if (!showCheckout) return null;

  return (
    <section className="check">
      <div className="pop-up">
        <div className="cart-content p-3 ">
          <div className="d-block text-right mb-3 mr-2">
            <IoMdClose
              onClick={handleClick}
              style={{ cursor: "pointer", fontSize: "1.3rem" }}
            />
          </div>

          <form className="pl-4 pr-4 pm-4 pt-0">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && (
                <div className="text-danger">{errors.address}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                className="form-control"
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                className="form-control"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="mastercard">Mastercard</option>
              </select>
              {errors.paymentMethod && (
                <div className="text-danger">{errors.paymentMethod}</div>
              )}
            </div>
            <div className="form-group pt-2 ">
              <button className="close-button" onClick={handleClick}>
                Close
              </button>
              <button
                className="cart-button float-right"
                onClick={handleSubmit}
              >
                Proceed to Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect()(CheckOut);

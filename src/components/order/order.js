import React, { useState } from "react";
import { useQuery } from "../../services/queries/useQuery";
import { connect } from "react-redux";
import { showOrder } from "../../redux/order/orderAction";
import { listOrderApi } from "../../services/api/order";
import "./style.css";

const Order = ({ showOrder }) => {
  const { data: ordersQuery } = useQuery(listOrderApi);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const toggleProductList = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "btn-warning";
      case "Processing":
        return "btn-info";
      case "Shipped":
        return "btn-primary";
      case "Delivered":
        return "btn-success";
      default:
        return "btn-secondary";
    }
  };

  const handlePrint = (order) => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    printWindow.document.write(`<html><head><title>Print Invoice</title>`);
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: 'Arial', sans-serif; }
      .product-item { margin-bottom: 10px; }
      .product-list { margin-top: 20px; }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');

    printWindow.document.write(`<h1>Order Invoice VTbazaar</h1>`);
    printWindow.document.write(`<strong>Order ID:</strong> ${order._id}<br>`);
    printWindow.document.write(`<strong>Status:</strong> ${order.status}<br>`);
    printWindow.document.write(`<strong>Customer:</strong> ${order.customer.username}<br>`);
    printWindow.document.write(`<strong>Created At:</strong> ${new Date(order.created_at).toLocaleString()}<br>`);
    printWindow.document.write('<h4>Products:</h4>');
    printWindow.document.write('<div class="product-list">');
    order.items.forEach(item => {
      printWindow.document.write(`<div class="product-item">
        <p><strong>Product:</strong> ${item.productName}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
      </div>`);
    });
    printWindow.document.write('</div>');

    printWindow.document.write(`<strong>Total Price:</strong> ₹${order.totalPrice}<br>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <section className="cart">
      <div className="pop-up">
        <div className="cart-content">
          <div className="cross-icon">
            <i className="fas fa-times" onClick={showOrder}></i>
          </div>
          <div className="container">
            {ordersQuery != null &&
              ordersQuery.orders.map((order) => (
                <div key={order._id} className="card mb-4">
                  <div
                    className="card-header"
                    onClick={() => toggleProductList(order._id)}
                  >
                    <h5>Order ID: {order._id}</h5>
                    <p>
                      Status:{" "}
                      <span className={`btn ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                  {selectedOrderId === order._id && (
                    <div className="card-body">
                      <p>Total Price: ₹{order.totalPrice}</p>
                      <p>Customer: {order.customer.username}</p>
                      <p>
                        Created At:{" "}
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                      <h5>Products:</h5>
                      <div className="product-list">
                        {order.items.map((item) => (
                          <div key={item._id} className="product-item">
                            <p>Product: {item.productName}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-primary" onClick={() => handlePrint(order)}>
                        Print Invoice
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showOrder: () => dispatch(showOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

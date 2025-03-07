import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../services/allAPIS";
import OrderProgressBar from "../components/OrderProgressBar";
import { FaEye, FaTimes } from "react-icons/fa";
import CancelOrderButton from "../components/cancelOrderButton";
import { OrderContext } from "../Context/OrderContext";

const ViewOrdersPage = () => {
  const {userOrders} = useContext(OrderContext);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();



  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700">Order History</h2>
      {userOrders.length > 0 ? (
        userOrders.map((order) => (
          <div
            key={order._id}
            className={`border rounded-lg p-4 shadow-md bg-white mb-4 ${
              order.status === "Cancelled" ? "border-red-500 bg-red-100" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: {order._id}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded ${
                  order.status === "Delivered"
                    ? "bg-green-200 text-green-700"
                    : order.status === "Cancelled"
                    ? "bg-red-200 text-red-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* If Order is Cancelled - Show Special View */}
            {order.status === "Cancelled" ? (
              <div className="mt-4 p-4 border-t border-red-500 bg-red-50">
                <h4 className="text-md font-semibold text-red-600">
                  Order Cancelled
                </h4>
                <p className="text-gray-600">
                  <strong>Reason:</strong> {order.finalReason}
                </p>
                <p className="text-gray-600">
                  <strong>Cancelled On:</strong>{" "}
                  {new Date(order.cancelledOn).toLocaleString()}
                </p>
                <button
                  className="flex items-center justify-center w-full bg-gray-800 text-white py-2 rounded transition hover:bg-gray-900"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  <FaEye className="mr-2" />
                  {expandedOrder === order._id ? "Hide Details" : "View Details"}
                  
                </button>
                {expandedOrder === order._id && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-md font-semibold">Products</h4>
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-2 mt-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              ₹{product.price} x {product.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-green-600">
                          ₹{product.total}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between text-gray-600 mt-2">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        ₹{order.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Fee:</span>
                      <span className="font-medium text-red-500">
                        ₹{order.shippingFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-800 text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        ₹{order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Delivery Address: {order.address}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Normal Order Details */}
                <p className="text-sm text-gray-500">
                  Estimated Delivery: {order.estimatedDelivery}
                </p>
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Items:</span>
                  <span className="font-medium">{order.products.length}</span>
                </div>
                <div className="flex justify-between text-gray-800 text-xl font-bold">
                  <span>Total Price:</span>
                  <span className="text-green-600">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Order Progress Bar */}
                <OrderProgressBar status={order.status} />

                {/* View Details & Cancel Order Buttons */}
                <button
                  className="flex items-center justify-center w-full bg-gray-800 text-white py-2 rounded transition hover:bg-gray-900"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  <FaEye className="mr-2" />
                  {expandedOrder === order._id ? "Hide Details" : "View Details"}
                </button>

                {order.status !== "Delivered" && (
                  <CancelOrderButton orderId={order._id} />
                )}

                {expandedOrder === order._id && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-md font-semibold">Products</h4>
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-2 mt-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              ₹{product.price} x {product.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold text-green-600">
                          ₹{product.total}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between text-gray-600 mt-2">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        ₹{order.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping Fee:</span>
                      <span className="font-medium text-red-500">
                        ₹{order.shippingFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-800 text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        ₹{order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Delivery Address: {order.address}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <h1 className="text-center text-red-500">No Orders Found</h1>
      )}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition mt-4"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ViewOrdersPage;

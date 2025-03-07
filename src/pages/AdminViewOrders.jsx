import React, { useContext, useState } from "react";
import { FaEye, FaTimes, FaTruck, FaCheckCircle, FaBan } from "react-icons/fa";
import { OrderContext } from "../Context/OrderContext";
import axios from "axios";
import { changeStatus } from "../services/allAPIS";
import { toast } from "react-toastify";

function AdminViewOrders() {
  const { orders, setOrders, fetchOrders } = useContext(OrderContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered"];

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const reqHeader = { authorization: `Bearer ${token}` };
    const reqBody = { orderId, newStatus };
    const response = await changeStatus(reqBody, reqHeader);

    if (response.status === 200) {
      toast.success("Status Changed");
      fetchOrders();
    } else {
      toast.warn("Status Not Changed");
    }
  };

  const OrderTable = ({ orders, showDropdown }) => (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 text-left">Customer Name</th>
            <th className="p-4 text-left">Product Count</th>
            <th className="p-4 text-left">Delivery Status</th>
            <th className="p-4 text-left">Payment Method</th>
            <th className="p-4 text-left">Total Price</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="p-4">{order.username}</td>
              <td className="p-4 text-center">{order.products.length}</td>
              <td className="p-4 font-semibold">
                {showDropdown ? (
                  <select
                    className="p-2 bg-gray-200 rounded"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  
                  <span className={`${order.status=="Delivered"?'text-green-600':'text-red-600'} font-bold`}>{order.status}</span>
                )}
              </td>
              <td className="p-4 capitalize">{order.paymentMethod}</td>
              <td className="p-4 font-bold text-green-600">₹{order.totalPrice}</td>
              <td className="p-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition"
                  onClick={() => setSelectedOrder(order)}
                >
                  <FaEye className="mr-2" /> View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const pendingOrders = orders.filter(order => order.status !== "Delivered" && order.status !== "Cancelled");
  const deliveredOrders = orders.filter(order => order.status === "Delivered");
  const cancelledOrders = orders.filter(order => order.status === "Cancelled");

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Order Management</h2>

      {/* Top Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("pending")}
        >
          <FaTruck /> Pending Orders ({pendingOrders.length})
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === "delivered" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("delivered")}
        >
          <FaCheckCircle /> Delivered ({deliveredOrders.length})
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === "cancelled" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("cancelled")}
        >
          <FaBan /> Cancelled ({cancelledOrders.length})
        </button>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === "pending" && <OrderTable orders={pendingOrders} showDropdown={true} />}
      {activeTab === "delivered" && <OrderTable orders={deliveredOrders} showDropdown={false} />}
      {activeTab === "cancelled" && <OrderTable orders={cancelledOrders} showDropdown={false} />}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-red-600"
              onClick={() => setSelectedOrder(null)}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <p><strong>Customer:</strong> {selectedOrder.username}</p>
            <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>

            <h4 className="mt-4 font-semibold">Products:</h4>
            {selectedOrder.products.map((product, index) => (
              <div key={index} className="flex items-center border-t py-2">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded mr-3" />
                <div>
                  <p><strong>{product.name}</strong></p>
                  <p>₹{product.price} x {product.quantity}</p>
                </div>
              </div>
            ))}

            <div className="mt-4 border-t pt-3">
              <p><strong>Subtotal:</strong> ₹{selectedOrder.subtotal}</p>
              <p><strong>Shipping Fee:</strong> ₹{selectedOrder.shippingFee}</p>
              <p className="font-bold text-lg text-green-600">Total: ₹{selectedOrder.totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminViewOrders;

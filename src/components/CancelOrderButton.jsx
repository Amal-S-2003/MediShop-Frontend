import React, { useContext } from "react";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { cancelOrder } from "../services/allAPIS";
import { toast, ToastContainer } from "react-toastify";
import { OrderContext } from "../Context/OrderContext";
function CancelOrderButton({ orderId }) {
  const [showCancelBox, setShowCancelBox] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const { fetchOrders,fetchUserOrders } = useContext(OrderContext);
  const handleCancelReasonChange = (event) => {
    setCancelReason(event.target.value);
    if (event.target.value !== "Other") {
      setOtherReason(""); // Reset other reason input when changing selection
    }
  };

  const submitCancelRequest = async () => {
    console.log("orderId", orderId);

    const finalReason = cancelReason === "Other" ? otherReason : cancelReason;
    if (!finalReason) {
      alert("Please select a reason or enter your reason.");
      return;
    }
    console.log("Order cancelled due to:", finalReason);
    const reqBody = {
      orderId,
      finalReason,
    };
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      return;
    }
    const reqHeader = { authorization: `Bearer ${token}` };
    const result = await cancelOrder(reqBody, reqHeader);
    if (result.status == 200) {
      setShowCancelBox(false); // Close the modal after submitting
      fetchUserOrders();
      toast.success("Order Cancelled SuccessFully!");
    } else {
      toast.warn("Order Cancelation Failed!");
    }
  };

  return (
    <div>
      {" "}
      <div className="flex flex-col gap-3 mt-2">
        {/* Cancel Order Button */}
        <button
          className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded transition hover:bg-red-600"
          onClick={() => setShowCancelBox(!showCancelBox)}
        >
          <FaTimes className="mr-2" />
          Cancel Order
        </button>

        {/* Cancel Order Popup */}
        {showCancelBox && (
          <div className="mt-3 bg-white p-4 rounded shadow-md border transition-all">
            <h3 className="text-lg font-semibold mb-2">Select a reason:</h3>

            {/* Reason Options */}
            <div className="space-y-2">
              {[
                "Changed my mind",
                "Found a better price",
                "Delay in delivery",
                "Other",
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={handleCancelReasonChange}
                    className="text-blue-600 focus:ring focus:ring-blue-400"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {/* Show input field if 'Other' is selected */}
            {cancelReason === "Other" && (
              <input
                type="text"
                placeholder="Enter your reason..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="mt-2 w-full p-2 border rounded focus:ring focus:ring-blue-300"
              />
            )}

            {/* Submit & Close Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setShowCancelBox(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={submitCancelRequest}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default CancelOrderButton;

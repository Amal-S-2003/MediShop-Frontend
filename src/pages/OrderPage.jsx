import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/c";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const OrderPage = () => {
  const navigate = useNavigate();
  
  const [selectedPayment, setSelectedPayment] = useState("credit_card");
  const [address, setAddress] = useState("123 Main Street, City, Country");
  
  const handleOrder = () => {
    toast.success("Order placed successfully!");
    setTimeout(() => navigate("/ordersuccess"), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      {/* Product Listing */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Your Items</h3>
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center">
              <img
                src="/path/to/image.jpg"
                alt="Product Name"
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p className="font-medium text-gray-800">Product Name</p>
                <p className="text-gray-500 text-sm">$50 x 2</p>
              </div>
            </div>
            <p className="font-semibold">$100</p>
          </div>
        </CardContent>
      </Card>

      {/* Address Section */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <label htmlFor="credit_card">Credit Card</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <label htmlFor="paypal">PayPal</label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">Order Total</h3>
          <p className="text-xl font-bold">$100</p>
          <Button className="w-full bg-green-500 hover:bg-green-700" onClick={handleOrder}>
            Place Order
          </Button>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={() => navigate("/cart")}>
          Back to Cart
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;

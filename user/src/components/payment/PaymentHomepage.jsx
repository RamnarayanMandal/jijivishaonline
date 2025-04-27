import React, { useState } from "react";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaCreditCard,
  FaCcVisa,
  FaGoogleWallet,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported
import CustomizedSteppers from "../CustomizedSteppers";
import Swal from "sweetalert2";
import { bagActions } from "../../store/bagSlice";

const PaymentHomepage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag) || {
    totalQuantity: 0,
    data: [],
  };
  const userId = localStorage.getItem("userId");
  const address = localStorage.getItem("selectedAddress")
    ? JSON.parse(localStorage.getItem("selectedAddress"))
    : {};
``
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };
 
  const URI = import.meta.env.VITE_API_URL;

  const placeOrder = async () => {
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Select Payment Method",
        text: "Please select a payment method before proceeding.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const products = bag.data.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      thumbnail: item.thumbnail,
      attributes: {
        size: item.size|| item?.attributes?.size,
        color: item.color || item?.attributes?.color,  
      },
    
    }));

    const orderData = {
      userId,
      address: address._id,
      products,
      paymentMethod,
      paymentStatus: "unpaid",
      status: "pending",
    };

    try {
      const response = await axios.post(
        `${URI}api/productOrder/orderProduct`,
        orderData
      );
      await clearCart()
      Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        text: "Generating success SMS.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/user-Profile/MyOrder");
    } catch (error) {
      console.error("Error placing the order:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const getTextColor = (method) =>
    paymentMethod === method ? "text-blue-600 font-semibold" : "text-gray-800";

  // Calculate the total amount
  const calculateTotal = () => {
    return bag.data.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart =async () => {
    try {
      await axios.delete(`${URI}api/user/${userId}`);
      dispatch(bagActions.clearBag());
      
    
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
    
  };

  // Sample discount percentage
  const discount = 10;

  // Calculate discounted total
  const discountedTotal = calculateTotal() * (1 - discount / 100);

  return (
    <>
      <div className="my-10">
        <CustomizedSteppers />
      </div>
      <div className="payment-bill-container p-6 max-w-5xl mx-auto bg-white shadow-md rounded-md w-full flex flex-col md:flex-row">
        <div className="payment-methods w-full md:w-1/2 p-6 border-r border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
          <div
            onClick={() => handlePaymentChange("Cash on Delivery")}
            className={`mb-4 flex items-center cursor-pointer ${getTextColor(
              "Cash on Delivery"
            )}`}
          >
            <FaMoneyBillWave className="text-green-500 text-2xl mr-2" />
            Cash on Delivery
          </div>
          <div
            onClick={() => handlePaymentChange("Net Banking")}
            className={`mb-4 flex items-center cursor-pointer ${getTextColor(
              "Net Banking"
            )}`}
          >
            <FaUniversity className="text-blue-500 text-2xl mr-2" />
            Net Banking
          </div>
          <div
            onClick={() => handlePaymentChange("Card Payment")}
            className={`mb-4 flex items-center cursor-pointer ${getTextColor(
              "Card Payment"
            )}`}
          >
            <FaCreditCard className="text-purple-500 text-2xl mr-2" />
            Card Payment
          </div>
          <div
            onClick={() => handlePaymentChange("Credit Card")}
            className={`mb-4 flex items-center cursor-pointer ${getTextColor(
              "Credit Card"
            )}`}
          >
            <FaCcVisa className="text-blue-700 text-2xl mr-2" />
            Credit Card
          </div>
          <div
            onClick={() => handlePaymentChange("UPI")}
            className={`mb-4 flex items-center cursor-pointer ${getTextColor(
              "UPI"
            )}`}
          >
            <FaGoogleWallet className="text-red-500 text-2xl mr-2" />
            UPI
          </div>
        </div>

        <div className="order-summary w-full md:w-1/2 p-6">
          <h1 className="text-xl font-semibold mb-4">Summary</h1>
          <div className="border-y-2 border-gray-300 bg-gray-100 rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-lg">Subtotal</p>
                <p className="text-lg">Rs {calculateTotal().toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Discount</p>
                <p className="text-lg">({discount}%)</p>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <p className="text-lg">Total</p>
                <p className="text-lg">Rs {discountedTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <button
            onClick={placeOrder}
            className="w-full bg-red-400 text-white py-3 rounded mt-6 text-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentHomepage;

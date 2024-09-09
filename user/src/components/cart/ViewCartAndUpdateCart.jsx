import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bagActions } from "../../store/bagSlice";
import CustomizedSteppers from "../CustomizedSteppers";

const ViewCartAndUpdateCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector((store) => store.bag) || { totalQuantity: 0, data: [] };
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const URI = import.meta.env.VITE_API_URL;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      // Check if newQuantity is greater than the current quantity
      if (newQuantity > bag.data.find(item => item._id === productId).quantity) {
        // Increase quantity
        dispatch(bagActions.increaseQuantity({ _id: productId }));
      } else {
        // Decrease quantity
        dispatch(bagActions.decreaseQuantity({ _id: productId }));
      }
    }
  };

  const handleSizeChange = (productId, newSize) => {
    // Update the size in the Redux store
    dispatch(bagActions.updateSize({ _id: productId, size: newSize }));
  };

  const applyCoupon = () => {
    setDiscount(couponCode === "SAVE5" ? 5 : 0);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      return parseFloat(price.replace(/,/g, '').trim()) || 0;
    }
    console.error('Invalid price format:', price);
    return 0;
  };

  const calculateTotal = () => {
    let total = bag.data.reduce((acc, item) => {
      const price = formatPrice(item.price);
      return acc + price * item.quantity;
    }, 0);
    return total - (total * (discount / 100));
  };

  return (
    <>
      <div className='mt-10'>
        <CustomizedSteppers />
      </div>
      <div className="p-4 md:flex md:justify-between md:gap-10">
        <div className="space-y-4 w-full md:w-8/12 border-t-2 border-gray-300 p-2">
          {bag.data.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-gray-200 pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${URI}${item.images[0]}`}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`size-${item._id}`} className="text-sm font-medium">
                      Size:
                    </label>
                    <select
                      id={`size-${item._id}`}
                      value={item.size} // Ensure 'size' is part of the product data
                      onChange={(e) => handleSizeChange(item._id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-sm"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor={`quantity-${item._id}`} className="text-sm">Quantity:</label>
                <input
                  id={`quantity-${item._id}`}
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                  className="w-16 border rounded p-1 text-center"
                  min="1"
                />
              </div>

              <p className="text-lg font-semibold">Rs {formatPrice(item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 md:w-4/12">
          <div className="border-y-2 border-gray-300 bg-gray-100 rounded-lg p-4">
            <h1 className="text-xl font-semibold mb-4">Summary</h1>
            <hr className="my-2" />
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
                <p className="text-lg">Rs {calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/CheckoutForm")}
            className="w-full bg-red-400 text-white py-2 rounded mt-6 text-lg"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewCartAndUpdateCart;

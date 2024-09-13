import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert"; // Import SweetAlert
import Modal from "react-modal"; // You can use any modal library or a custom modal

Modal.setAppElement("#root"); // Set the app root for accessibility

const BookOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    filterOrdersByStatus();
  }, [activeTab, orders]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${URI}api/productOrder/`);
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterOrdersByStatus = () => {
    if (activeTab === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === activeTab);
      setFilteredOrders(filtered);
    }
  };

  const handleOnclick = async (orderId, status, userId) => {
    if (status === "pending") {
      updateOrderStatus(orderId, "processing");
    } else if (status === "processing") {
      updateOrderStatus(orderId, "shipped");
    } else if (status === "shipped") {
      delivered(orderId, userId);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`${URI}api/productOrder/changeOrderStatus`, {
        orderId,
        status,
      });
      fetchOrder(); // Refresh orders after update
      Swal("Success", `Order status updated to ${status}`, "success"); // SweetAlert for success message
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal("Error", "Failed to update order status", "error");
    }
  };

  const delivered = async (orderId, userId) => {
    try {
      await axios.put(`${URI}api/productOrder/sendOpt/${userId}`);
      Swal("Order Delivered", "An OTP has been sent to the user", "success");
      // Store current orderId and userId for OTP verification
      setCurrentOrderId(orderId);
      setCurrentUserId(userId);
      setOtpModalOpen(true); // Open OTP modal
    } catch (error) {
      console.error("Error:", error);
      Swal("Error", "Failed to send OTP", "error");
    }
  };

  const verifyOrder = async () => {
    try {
      await axios.put(`${URI}api/productOrder/vefifyOrder`, {
        orderId: currentOrderId,
        otp,
      });
      Swal("Order Verified", "The order has been successfully verified", "success");
      setOtpModalOpen(false); // Close the OTP modal
      fetchOrder(); // Refresh orders
    } catch (error) {
      console.error("Error:", error);
      Swal("Error", "Failed to verify the order", "error");
    }
  };

  const cancelOrder = async (orderId) => {
    Swal({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then(async (willCancel) => {
      if (willCancel) {
        try {
          await axios.put(`${URI}api/productOrder/cancelOrder/${orderId}`);
          Swal("Order Cancelled", "The order has been successfully cancelled", "success");
          fetchOrder(); // Refresh orders
        } catch (error) {
          console.error("Error:", error);
          Swal("Error", "Failed to cancel the order", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Tab Bar for Order Status */}
      <div className="flex space-x-4 mb-6">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`py-2 px-4 rounded-md ${
              activeTab === status
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <p className="text-sm text-green-600 mb-4">
        {activeTab === "all" ? "List of All Orders" : `List of ${activeTab} Orders`}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Phone NO</th>
              <th className="py-2 px-4 border-b">Shipping Information</th>
              <th className="py-2 px-4 border-b">Product Image</th>
              <th className="py-2 px-4 border-b">Product Details</th>
              <th className="py-2 px-4 border-b">Attributes</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{order.user.email}</td>
                <td className="py-2 px-4 border-b">{order.address.phone}</td>
                <td className="py-2 px-4 border-b">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state}
                  </p>
                  <p>
                    {order.address.country}, {order.address.postalCode}
                  </p>
                </td>
                <td className="py-2 px-4 border-b">
                  {order.products.map((product) => (
                    <img
                      key={product.productId}
                      src={`${URI}${product.thumbnail}`}
                      alt="Product"
                      className="w-20 rounded-sm"
                    />
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.products.map((product) => (
                    <div key={product.productId}>
                      <p>Product ID: {product.productId}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.products.map((product) => (
                    <div key={product.productId}>
                      <p>Size: {product.attributes.size.join(", ")}</p>
                      <p>Color: {product.attributes.color.join(", ")}</p>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b flex justify-center flex-col gap-2 ">
                  <button
                    className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => handleOnclick(order._id, order.status, order.userId)}
                  >
                    {order.status}
                  </button>
                  {["pending", "processing"].includes(order.status) && (
                    <button
                      className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-800"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OTP Modal */}
      <Modal
        isOpen={otpModalOpen}
        onRequestClose={() => setOtpModalOpen(false)}
        contentLabel="OTP Verification Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Verify Order</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="mb-4 px-4 py-2 border rounded-md w-full"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={verifyOrder}
        >
          Verify
        </button>
      </Modal>
    </div>
  );
};

export default BookOrder;

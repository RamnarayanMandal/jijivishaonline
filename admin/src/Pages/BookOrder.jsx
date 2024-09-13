import React, { useEffect, useState } from "react";
import axios from "axios";

const BookOrder = () => {
  const [orders, setOrders] = useState([]);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${URI}api/productOrder/`);
      const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
      console.log(sortedOrders);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p className="text-sm text-green-600 mb-4">List of Orders</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Phone NO</th>
              <th className="py-2 px-4 border-b">Shiping information</th>
              <th className="py-2 px-4 border-b">Product Image</th>
              <th className="py-2 px-4 border-b">Product Details</th>
              <th className="py-2 px-4 border-b">Attributes</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{order.user.email}</td>
                <td className="py-2 px-4 border-b">{order.address.phone}</td>
                
                <td className="py-2 px-4 border-b">
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}</p>
                  <p>{order.address.country}, {order.address.postalCode}</p>
                </td>
                <td className="py-2 px-4 border-b">
                  {order.products.map((product) => (
                    <img
                      key={product.productId}
                      src={`${URI}${product.
                        thumbnail}`} // Ensure this is the correct path to the image
                      alt="Product"
                      className="w-20  rounded-sm"
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
                      <p>Size: {product.attributes.size.join(', ')}</p>
                      <p>Color: {product.attributes.color.join(', ')}</p>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-gray-200 text-black px-4 py-1 rounded-md hover:bg-gray-300">
                    {order.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm">1 row selected</span>
        <div className="flex items-center">
          <span className="text-sm mr-4">Rows per page:</span>
          <select className="border border-gray-300 rounded-md p-1">
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm ml-4">1–3 of 3</span>
          <button className="ml-4 text-gray-500 hover:text-black">&lt;</button>
          <button className="ml-2 text-gray-500 hover:text-black">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default BookOrder;

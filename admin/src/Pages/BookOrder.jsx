import React from "react";

const orders = [
  {
    id: 1,
    date: "Sep 11, 2024 5:28 PM",
    customerName: "Anish",
    phone: "6363022752",
    pickupLocation:
      "393, Channasandra, Srinivaspura, Bengaluru, Karnataka 560060, India",
    dropLocation: "2F5H+3JW, Andrahalli, Bengaluru, Karnataka 560091, India",
    city: "Bangalore",
    status: "Update",
  },
  {
    id: 2,
    date: "Sep 9, 2024 12:17 PM",
    customerName: "Ram",
    phone: "6363427479",
    pickupLocation:
      "Shop No 1, Appanna Layout, Outer Ring Rd, Mahadevapura, Bengaluru, Karnataka 560048, India",
    dropLocation:
      "6-11, off B.M. Kaval, off Kanakapura Road, Thathaguni, Bengaluru, Karnataka 560062, India",
    city: "Bangalore",
    status: "Update",
  },
  {
    id: 3,
    date: "Sep 9, 2024 6:22 PM",
    customerName: "Pankaj",
    phone: "7760779659",
    pickupLocation:
      "01, Near, Mahadevapura Flyover, Mahadevapura, Bengaluru, Karnataka 560048, India",
    dropLocation:
      "01, Amarjyothi Colony, Cholanayakanahalli, Hebbal, Bengaluru, Karnataka 560032, India",
    city: "Lucknow",
    status: "Update",
  },
  {
    id: 4,
    date: "Aug 30, 2024 5:28 PM",
    customerName: "yogesh nnc11",
    phone: "6363022752",
    pickupLocation:
      "393, Channasandra, Srinivaspura, Bengaluru, Karnataka 560060, India",
    dropLocation: "2F5H+3JW, Andrahalli, Bengaluru, Karnataka 560091, India",
    city: "Bangalore",
    status: "Update",
  },
  {
    id: 5,
    date: "Aug 30, 2024 5:28 PM",
    customerName: "yogesh nnc11",
    phone: "6363022752",
    pickupLocation:
      "393, Channasandra, Srinivaspura, Bengaluru, Karnataka 560060, India",
    dropLocation: "2F5H+3JW, Andrahalli, Bengaluru, Karnataka 560091, India",
    city: "Bangalore",
    status: "Update",
  },
];

const BookOrder = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Try to booking Order</h1>
      <p className="text-sm text-green-600 mb-4">List of Orders</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Phone No.</th>
              <th className="py-2 px-4 border-b">Pickup Location</th>
              <th className="py-2 px-4 border-b">Drop Location</th>
              <th className="py-2 px-4 border-b">City</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.date}</td>
                <td className="py-2 px-4 border-b">{order.customerName}</td>
                <td className="py-2 px-4 border-b">{order.phone}</td>
                <td className="py-2 px-4 border-b">{order.pickupLocation}</td>
                <td className="py-2 px-4 border-b">{order.dropLocation}</td>
                <td className="py-2 px-4 border-b">{order.city}</td>
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

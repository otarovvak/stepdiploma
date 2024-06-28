import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/orders");
      const ordersWithDetails = await Promise.all(
        response.data.map(async (order) => {
          const user = await axios.get(
            `http://localhost:4000/users/${order.userId}`
          );
          const itemsWithProductDetails = await Promise.all(
            order.items.map(async (item) => {
              const product = await axios.get(
                `http://localhost:4000/allproducts/${item.productId}`
              );
              return { ...item, product: product.data };
            })
          );
          return { ...order, user: user.data, items: itemsWithProductDetails };
        })
      );
      setOrders(ordersWithDetails);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const approveOrder = async (orderId) => {
    try {
      await axios.post(`http://localhost:4000/orders/${orderId}/approve`);
      fetchOrders();
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-10 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Total Amount</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className={`border-b border-gray-200 ${
                  order.status === "Approved" ? "bg-green-100" : ""
                }`}
              >
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.user && order.user.name}</td>
                <td className="px-10 py-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <img
                        src={item.product && item.product.api_featured_image}
                        alt={item.product && item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">
                          {item.product && item.product.name}
                        </p>
                        <p>
                          Quantity: {item.quantity}
                          Color: {item.color && item.color.colour_name}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">{order.totalAmount}</td>
                <td className="px-4 py-2">{order.address}</td>
                <td className="px-4 py-2">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2 space-x-2">
                  {order.status === "Pending" && (
                    <button
                      className="btn_secondary_rounded"
                      onClick={() => approveOrder(order._id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="btn_red_rounded"
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

"use client";
import axios from "axios";
import React from "react";

const AdminDashboard = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const status = (event.target as HTMLFormElement).status.value;
    try {
      const res = await axios.post(
        "http://192.168.1.29:5000/update-order-status",
        {
          status: status,
        }
      );
      if (res.status === 200) {
        alert("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again later.");
    }
  };
  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <select name="status">
          <option value="Received">Received</option>
          <option value="In Progress">In Progress</option>
          <option value="Ready">Ready</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit">Update Order Status</button>
      </form>
    </div>
  );
};

export default AdminDashboard;

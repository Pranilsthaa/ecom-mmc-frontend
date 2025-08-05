"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type OrderStatusType =
  | "Received"
  | "In Progress"
  | "Ready"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type OrderStatus = {
  status: OrderStatusType;
};

const statusMessages: Record<
  OrderStatusType,
  { title: string; message: string; color: string }
> = {
  Received: {
    title: "Order Received",
    message: "Your order has been received and is being processed.",
    color: "bg-blue-500",
  },
  "In Progress": {
    title: "Order In Progress",
    message: "Your order is currently being processed.",
    color: "bg-yellow-500",
  },
  Ready: {
    title: "Order Ready",
    message: "Your order is ready for pickup.",
    color: "bg-orange-500",
  },
  Shipped: {
    title: "Order Shipped",
    message: "Your order has been shipped and is on its way.",
    color: "bg-teal-500",
  },
  Delivered: {
    title: "Order Delivered",
    message: "Your order has been delivered successfully.",
    color: "bg-green-500",
  },
  Cancelled: {
    title: "Order Cancelled",
    message: "Your order has been cancelled.",
    color: "bg-red-500",
  },
};

const statusTimeline: OrderStatusType[] = [
  "Received",
  "In Progress",
  "Ready",
  "Shipped",
  "Delivered",
];

const SkeletonLoader = () => (
  <div className="text-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-24 h-6 bg-gray-300 rounded mb-4"></div>
      <div className="w-48 h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const Timeline = ({
  currentStatus,
}: {
  currentStatus: OrderStatusType | null;
}) => {
  if (!currentStatus) return null;

  const currentIndex = statusTimeline.indexOf(currentStatus);

  if (currentStatus === "Cancelled") {
    return (
      <div className="text-center mt-8">
        <h3 className="text-lg font-semibold text-red-500">Order Cancelled</h3>
        <p className="text-gray-600">
          We're sorry, but your order has been cancelled.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <div className="flex items-center justify-between">
        {statusTimeline.map((status, index) => (
          <div key={status} className="flex-1 flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index <= currentIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {index <= currentIndex && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            {index < statusTimeline.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentIndex ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {statusTimeline.map((status, index) => (
          <div
            key={status}
            className={`text-xs text-center ${
              index === currentIndex
                ? "font-bold text-gray-800"
                : "text-gray-500"
            }`}
          >
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TrackOrder() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socket = new WebSocket("ws://192.168.1.10:5000");
  socket.onmessage = (event) => {
    socket.send(
      JSON.stringify({
        type: "auth",
        userId: 1,
        orderId: "ord-1001-1002",
      })
    );
    const data: OrderStatus = JSON.parse(event.data);
    setOrderStatus(data);
  };
  const currentStatus = orderStatus?.status;
  const statusInfo = currentStatus ? statusMessages[currentStatus] : null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Track Your Order
        </h1>
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button
              // onClick={getOrderStatus}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : statusInfo ? (
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <span
                className={`w-4 h-4 rounded-full ${statusInfo.color} mr-2`}
              ></span>
              <h2 className="text-xl font-semibold text-gray-700">
                {statusInfo.title}
              </h2>
            </div>
            <p className="text-gray-600">{statusInfo.message}</p>
            <Timeline currentStatus={currentStatus ?? null} />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">Could not retrieve order status.</p>
          </div>
        )}
      </div>
    </main>
  );
}

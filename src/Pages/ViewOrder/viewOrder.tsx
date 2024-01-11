import React, { useState, useEffect } from "react";
import { viewOrder } from "../../Api/viewOrder";
import { Order } from "../../interfaces/order.interface";
import { useParams } from "react-router-dom";
import { socket } from "../../socket/useSocket";
import OrderDetailsComponent from "../../components/OrderDetails/orderDetails";

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    viewOrder(orderId)
      .then((data) => {
        console.log("Order data is ", data);
        setOrder(data);
      })
      .catch((error) => {});
  }, [orderId]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function connectedUser(...args: any[]) {
      console.log("Connected user is ", args);
    }

    function updatedOrder(data: any) {
      console.log("Updated Order is ", data);
      setOrder(data?.order ? data?.order : order);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connection", connectedUser);
    socket.on("order-status-changed", updatedOrder);

    return () => {
      socket.off("connection");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [order]);

  return <OrderDetailsComponent order={order} />;
};

export default OrderDetailsPage;

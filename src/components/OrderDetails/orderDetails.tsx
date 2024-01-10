import React, { useState, useEffect } from "react";
import { viewOrder } from "../../Api/viewOrder";
import { Order } from "../../interfaces/order.interface";
import { useParams } from "react-router-dom";
//import { useSocket } from "../../socket/useSocket";
import socketIOClient, { Socket } from "socket.io-client";
import { socket } from "../../socket/useSocket";

interface RouteParams {
  orderId: string;
}

const OrderDeatils: React.FC = () => {
  console.log("order details");
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

    // const listener = (...args: any) => {
    //   console.log(args);
    // };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connection", connectedUser);
    socket.on("order-status-changed", updatedOrder);

    return () => {
      socket.off("connection");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      //socket.removeAllListeners();
      //socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>Order Details Page</div>
      {order && (
        <div>
          <h3>{order.id}</h3>
          <h4>{order.status}</h4>
        </div>
      )}
    </>
  );
};

export default OrderDeatils;

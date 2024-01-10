import socketIOClient, { Socket } from "socket.io-client";

export const socket = socketIOClient("http://localhost:4000", {
  auth: {
    token: `Bearer ${localStorage.getItem("token") as string}`,
  },
});

// import { useState, useEffect } from "react";
// import socketIOClient, { Socket } from "socket.io-client";

// export function useSocket({
//   endpoint,
//   token,
// }: {
//   endpoint: string;
//   token: string;
// }) {
//   //   const socket = socketIOClient(endpoint, {
//   //     auth: {
//   //       token: `Bearer ${token}`,
//   //     },
//   //   });
//   const [socket, setSocket] = useState(
//     socketIOClient(endpoint, {
//       auth: {
//         token: `Bearer ${token}`,
//       },
//     })
//   );
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // console.log("useSocket useEffect", socket);

//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//       socket.removeAllListeners();
//       socket.disconnect();
//     };
//   }, []);

//   // we return the socket client instance and the connection state
//   return {
//     isConnected,
//     socket,
//   };
// }

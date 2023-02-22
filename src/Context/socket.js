import React from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";
export const socket = io(SOCKET_SERVER_URL);
const SocketContext = React.createContext(socket);
export default SocketContext;
import { SOCKET_SERVER_URL } from "@/config/const";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/interfaces/socket.interface";
import { actionChat, selectChat } from "@/pages/chat/chatSlice";
import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../hook";

export const chatMiddleware: Middleware = (store) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;
    console.log(isConnectionEstablished);
    if (actionChat.startConnection.match(action) && !isConnectionEstablished) {
      //start connect sokect io with "/chat" space name
      socket = io(SOCKET_SERVER_URL + "/chat", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.onAny((event, ...args) => {
        console.log(event, args);
      });

      socket.on("connect", () => {
        console.log("connectionEstablished");
        store.dispatch(actionChat.connectionEstablished());
      });

      socket.on("chat:response:get-all-users-status", (data) => {
        console.log("setAllUsersState");
        store.dispatch(actionChat.setAllUsersState({ usersState: data }));
      });
    }

    if (isConnectionEstablished) {
      if (actionChat.requestGetAllUsersState.match(action)) {
        socket.emit("chat:request:get-all-users-status");
      }
    }

    next(action);
  };
};

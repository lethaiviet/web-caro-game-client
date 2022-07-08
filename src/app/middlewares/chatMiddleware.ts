import { SOCKET_SERVER_URL } from "@/config/const";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/interfaces/socket.interface";
import { actionChat } from "@/pages/chat/chatSlice";
import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";

export const chatMiddleware: Middleware = (store) => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

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
        store.dispatch(actionChat.connectionEstablished());
      });

      socket.on("chat:response:get-all-users-status", (data) => {
        store.dispatch(actionChat.setAllUsersState({ usersState: data }));
      });

      socket.on(
        "chat:response:get-all-messages-from-private-chat-room",
        (data) => {
          store.dispatch(actionChat.getAllMessagesInRoom(data));
        }
      );

      socket.on("chat:response:send-message-from-private-chat-room", (data) => {
        store.dispatch(actionChat.recievePrivateMessage(data));
      });
    }

    if (isConnectionEstablished) {
      if (actionChat.requestGetAllUsersState.match(action)) {
        socket.emit("chat:request:get-all-users-status");
      }

      if (actionChat.requestGetAllMessagesInRoom.match(action)) {
        socket.emit(
          "chat:request:get-all-messages-from-private-chat-room",
          action.payload
        );
      }

      if (actionChat.sendMessageToPrivateChatRoom.match(action)) {
        socket.emit(
          "chat:request:send-message-from-private-chat-room",
          action.payload
        );
      }
    }

    next(action);
  };
};

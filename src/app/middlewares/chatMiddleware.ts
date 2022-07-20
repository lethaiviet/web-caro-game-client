import { SOCKET_SERVER_URL } from "@/config/const";
import {
  SocketClientEvents,
  SocketServerEvents,
} from "@/interfaces/socket.interface";
import { actionChat } from "@/pages/chat/chatSlice";
import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";

export const chatMiddleware: Middleware = (store) => {
  let socket: Socket<SocketServerEvents, SocketClientEvents>;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (actionChat.startConnection.match(action) && !isConnectionEstablished) {
      //start connect sokect io with "/chat" space name
      socket = io(SOCKET_SERVER_URL + "/chat", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        store.dispatch(actionChat.connectionEstablished());
        socket.emit(
          "chat:acknowledgement:get-all-private-messages-in-all-rooms",
          (data) => {
            store.dispatch(
              actionChat.recieveAllMsgFromAllPrivateChatRoom(data)
            );
          }
        );
      });

      socket.on("chat:inform:get-all-users-status", (data) => {
        store.dispatch(actionChat.setAllUsersState({ usersState: data }));
      });

      socket.on("chat:response:get-all-private-messages-in-room", (data) => {
        store.dispatch(actionChat.getAllMessagesInRoom(data));
      });

      socket.on("chat:inform:get-new-private-message", (data) => {
        store.dispatch(actionChat.recievePrivateMessage(data));
      });
    }

    if (isConnectionEstablished) {
      if (actionChat.requestGetAllUsersState.match(action)) {
        socket.emit("chat:acknowledgement:get-all-users-status", (data) => {
          store.dispatch(actionChat.setAllUsersState({ usersState: data }));
        });
      }

      if (actionChat.requestGetAllMessagesInRoom.match(action)) {
        socket.emit(
          "chat:request:get-all-private-messages-in-room",
          action.payload
        );
      }

      if (actionChat.sendPrivateMessageToRoom.match(action)) {
        socket.emit("chat:action:send-private-message", action.payload);
      }

      if (actionChat.markAsReadAllMessagesInPrivateChatRoom.match(action)) {
        socket.emit(
          "chat:action:mark-as-read-all-private-messages-in-room",
          action.payload
        );
      }

      if (actionChat.requestDisconnectSocket.match(action)) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    }

    next(action);
  };
};

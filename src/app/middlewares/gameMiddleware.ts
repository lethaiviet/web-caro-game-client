import { SOCKET_SERVER_URL } from "@/config/const";
import {
  SocketClientEvents,
  SocketServerEvents,
} from "@/interfaces/socket.interface";
import { actionGame } from "@/pages/game/gameSlice";
import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";

export const gameMiddleware: Middleware = (store) => {
  let socket: Socket<SocketServerEvents, SocketClientEvents>;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().game.isConnected;

    if (actionGame.startConnection.match(action) && !isConnectionEstablished) {
      //start connect sokect io with "/chat" space name
      socket = io(SOCKET_SERVER_URL + "/game", {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.onAny((event, ...args) => {
        console.log(event, args);
      });

      socket.on("connect", () => {
        store.dispatch(actionGame.connectionEstablished());
      });

      socket.on("game:inform:get-all-p4f-rooms", (data) => {
        store.dispatch(actionGame.setPlayForFunRooms(data));
      });
    }

    if (isConnectionEstablished) {
      if (actionGame.createPlayForFunRoom.match(action)) {
        socket.emit(
          "game:acknowledgement:create-p4f-room",
          (gameRoom, error) => {
            store.dispatch(
              actionGame.setCurrentPlayForFunRoom({ gameRoom, error })
            );
          }
        );
      }

      if (actionGame.joinPlayForFunRoom.match(action)) {
        socket.emit(
          "game:acknowledgement:join-p4f-room",
          action.payload,
          (gameRoom, error) => {
            store.dispatch(
              actionGame.setCurrentPlayForFunRoom({ gameRoom, error })
            );
          }
        );
      }

      if (actionGame.requestDisconnectSocket.match(action)) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    }

    next(action);
  };
};

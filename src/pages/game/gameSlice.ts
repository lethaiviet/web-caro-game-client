import { RootState } from "@/app/store";
import { GameRoom, Position } from "@/interfaces/game-rooms.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

interface GameState {
  isConnecting: boolean;
  isConnected: boolean;
  playForFunRooms: GameRoom[];
  currentPlayForFunRoom: GameRoom;
  errorMsg: string | null;
}

const emptyPlayForFunRoom: GameRoom = {
  _id: "",
  name: "",
  createdAt: 0,
  players: [],
  spectators: [],
  isStarted: false,
  turnOf: "",
  boardGame: { data: [], winnerPositions: [] },
  timeOut: 0,
  lastActionTime: 0,
  type: "PlayForFun",
};

const initialState: GameState = {
  isConnecting: false,
  isConnected: false,
  playForFunRooms: [],
  errorMsg: null,
  currentPlayForFunRoom: emptyPlayForFunRoom,
};

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startConnection(state: GameState) {
      state.isConnecting = true;
    },

    connectionEstablished(state: GameState) {
      state.isConnecting = true;
      state.isConnected = true;
    },

    setPlayForFunRooms(state: GameState, action: PayloadAction<GameRoom[]>) {
      state.playForFunRooms = action.payload;
    },

    setCurrentPlayForFunRoom(
      state: GameState,
      action: PayloadAction<{ gameRoom: GameRoom; error: Error | null }>
    ) {
      state.errorMsg = action.payload.error
        ? action.payload.error.message
        : null;

      if (state.errorMsg === null) {
        state.currentPlayForFunRoom = action.payload.gameRoom;
      }
    },

    acceptRunningGame(
      state: GameState,
      action: PayloadAction<{ roomId: string; isReady: boolean }>
    ) {
      return;
    },

    createPlayForFunRoom(state: GameState) {
      return;
    },

    joinPlayForFunRoom(state: GameState, action: PayloadAction<string>) {
      return;
    },

    requestCheckPlayerAFKAndSwitchTurn(
      state: GameState,
      action: PayloadAction<string>
    ) {
      return;
    },

    requestDisconnectSocket(state: GameState) {
      return;
    },

    requestLeaveCurrentRoom(
      state: GameState,
      action: PayloadAction<{ roomId: string; currentUserId: string }>
    ) {
      const roomId = action.payload.roomId;
      const currentUserId = action.payload.currentUserId;

      state.playForFunRooms = state.playForFunRooms
        .map((room) => {
          if (roomId !== room._id) return room;

          _.remove(room.players, (player) => {
            return player._id === currentUserId;
          });

          _.remove(room.spectators, (spectatorId) => {
            return spectatorId === currentUserId;
          });

          return room;
        })
        .filter((room) => room.players.length > 0);

      state.currentPlayForFunRoom = emptyPlayForFunRoom;
    },

    playGame(
      state: GameState,
      action: PayloadAction<{ roomId: string; pos: Position }>
    ) {
      return;
    },
  },
});

export const actionGame = GameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default GameSlice.reducer;

import { RootState } from "@/app/store";
import { GameRoom } from "@/interfaces/game-rooms.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  isConnecting: boolean;
  isConnected: boolean;
  playForFunRooms: GameRoom[];
  currentPlayForFunRoom: GameRoom;
  errorMsg: string | null;
}

const emptyPlayForFunRoom = {
  _id: "",
  name: "",
  createdAt: 0,
  players: [],
  spectators: [],
  isStarted: false,
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
        console.log("setCurrentPlayForFunRoom");
        state.currentPlayForFunRoom = action.payload.gameRoom;
      }
    },

    resetCurrentPlayForFunRoom(state: GameState) {
      state.currentPlayForFunRoom = emptyPlayForFunRoom;
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

    requestDisconnectSocket(state: GameState) {
      return;
    },

    requestLeaveCurrentRoom(state: GameState) {
      return;
    },
  },
});

export const actionGame = GameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default GameSlice.reducer;

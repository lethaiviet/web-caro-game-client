import { RootState } from "@/app/store";
import { UserStates } from "@/interfaces/users.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  isConnecting: boolean;
  isConnected: boolean;
  usersStates: UserStates[] | null;
}

const initialState: ChatState = {
  isConnecting: false,
  isConnected: false,
  usersStates: null,
};

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startConnection(state: ChatState) {
      state.isConnecting = true;
    },
    connectionEstablished(state: ChatState) {
      state.isConnecting = true;
      state.isConnected = true;
    },
    setAllUsersState(
      state: ChatState,
      action: PayloadAction<{ usersState: UserStates[] }>
    ) {
      state.usersStates = action.payload.usersState;
    },
    requestGetAllUsersState(state: ChatState) {
      return state;
    },
  },
});

export const actionChat = ChatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default ChatSlice.reducer;

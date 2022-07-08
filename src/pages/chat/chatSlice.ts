import { RootState } from "@/app/store";
import {
  AllMessagesInRoom,
  CommonMessage,
  DetailMessage,
  SimpleMessage,
} from "@/interfaces/chat-messages.interface";
import { UserStates } from "@/interfaces/users.interface";
import { getCurrentTime, sortMessagesByTime } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  isConnecting: boolean;
  isConnected: boolean;
  usersStates: UserStates[];
  selectedChatter: UserStates;
  allMessages: AllMessagesInRoom[];
  messagesCurrentChater: DetailMessage[];
}

const initialState: ChatState = {
  isConnecting: false,
  isConnected: false,
  usersStates: [],
  selectedChatter: { _id: "", name: "", status: "Offline", avatar: "" },
  allMessages: [],
  messagesCurrentChater: [],
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

    getAllMessagesInRoom(
      state: ChatState,
      action: PayloadAction<AllMessagesInRoom>
    ) {
      const findIdx = state.allMessages.findIndex(
        (x) => x.roomName === action.payload.roomName
      );

      if (findIdx < 0) {
        state.allMessages.push(action.payload);
      } else {
        state.allMessages[findIdx] = action.payload;
      }

      state.messagesCurrentChater = action.payload.messages;
    },

    recievePrivateMessage(
      state: ChatState,
      action: PayloadAction<DetailMessage>
    ) {
      const message = action.payload;
      const allMessageInRoom: AllMessagesInRoom = {
        roomName: message.senderId,
        messages: [message],
      };

      const findIdx = state.allMessages.findIndex(
        (x) => x.roomName === message.senderId
      );

      if (findIdx < 0) {
        state.allMessages.push(allMessageInRoom);
      } else {
        state.allMessages[findIdx].messages.push(message);
      }

      state.messagesCurrentChater.push(message);
    },

    sendMessageToPrivateChatRoom(
      state: ChatState,
      action: PayloadAction<CommonMessage>
    ) {
      const created_at = getCurrentTime();
      const message: DetailMessage = {
        senderId: action.payload.from,
        _id: created_at,
        created_at,
        content: action.payload.content,
      };

      const allMessageInRoom: AllMessagesInRoom = {
        roomName: message.senderId,
        messages: [message],
      };

      state.messagesCurrentChater.push(message);

      const findIdx = state.allMessages.findIndex(
        (x) => x.roomName === message.senderId
      );

      if (findIdx < 0) {
        state.allMessages.push(allMessageInRoom);
      } else {
        state.allMessages[findIdx].messages = state.messagesCurrentChater;
      }
    },

    requestGetAllMessagesInRoom(
      state: ChatState,
      action: PayloadAction<string>
    ) {
      const findIdx = state.usersStates.findIndex(
        (x) => x._id === action.payload
      );
      if (findIdx >= 0) {
        state.selectedChatter = state.usersStates[findIdx];
      }

      return state;
    },

    requestGetAllUsersState(state: ChatState) {
      return state;
    },
  },
});

export const actionChat = ChatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default ChatSlice.reducer;

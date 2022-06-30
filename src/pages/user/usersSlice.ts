import { RootState } from "@/app/store";
import { InsensitiveUserData } from "@/services/user.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  updateAvatarCurrentUser,
  updateCurrentUser,
} from "./usersThunk";

interface UsersState {
  currentUser: InsensitiveUserData;
  status: "idle" | "pending" | "error" | "success";
  updateCurrentUserMsg: string | null;
  message: string | null;
}

const initialState: UsersState = {
  currentUser: {
    _id: "",
    email: "",
    status: "",
    bio: "",
    name: "",
    avatar: "",
    exp: 0,
  },
  status: "idle",
  message: null,
  updateCurrentUserMsg: null,
};

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setBio(state: UsersState, action: PayloadAction<string>) {
      state.currentUser.bio = action.payload;
    },
    setName(state: UsersState, action: PayloadAction<string>) {
      state.currentUser.name = action.payload;
    },
    setAvatar(state: UsersState, action: PayloadAction<string>) {
      state.currentUser.avatar = action.payload;
    },
  },

  extraReducers: (builder) => {
    //getCurrentUser
    builder.addCase(getCurrentUser.pending, (state: UsersState) => {
      state.status = "pending";
      state.message = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state: UsersState, action) => {
      state.status = "success";
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state: UsersState, action) => {
      state.status = "error";
      state.currentUser = initialState.currentUser;
      state.message = action.payload?.message || null;
    });

    //updateCurrentUser
    builder.addCase(updateCurrentUser.pending, (state: UsersState) => {
      state.status = "pending";
      state.message = null;
    });
    builder.addCase(
      updateCurrentUser.fulfilled,
      (state: UsersState, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      }
    );
    builder.addCase(updateCurrentUser.rejected, (state: UsersState, action) => {
      state.status = "error";
      state.updateCurrentUserMsg = action.payload?.message || null;
    });

    //updateAvatarCurrentUser
    builder.addCase(updateAvatarCurrentUser.pending, (state: UsersState) => {
      state.status = "pending";
      state.message = null;
    });
    builder.addCase(
      updateAvatarCurrentUser.fulfilled,
      (state: UsersState, action) => {
        state.status = "success";
        state.currentUser.avatar = action.payload;
      }
    );
    builder.addCase(
      updateAvatarCurrentUser.rejected,
      (state: UsersState, action) => {
        state.status = "error";
        state.updateCurrentUserMsg = action.payload?.message || null;
      }
    );
  },
});

export const { setBio, setName, setAvatar } = UsersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default UsersSlice.reducer;

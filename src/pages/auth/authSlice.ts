import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@storeRedux";
import { signup, login } from "./authThunk";

export interface AuthState {
  username: string;
  password: string;
  status: "idle" | "pending" | "error" | "success";
  message: string | null;
  authorized: boolean;
}

const initialState: AuthState = {
  username: "",
  password: "",
  status: "idle",
  message: null,
  authorized: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    clearAuthStates(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    //signup
    builder.addCase(signup.pending, (state: AuthState) => {
      state.status = "pending";
      state.message = null;
    });
    builder.addCase(signup.fulfilled, (state: AuthState, action) => {
      state.status = "success";
      state.message = action.payload?.message;
    });
    builder.addCase(signup.rejected, (state: AuthState, action) => {
      state.status = "error";
      state.message = action.payload?.message || null;
    });

    //login
    builder.addCase(login.pending, (state: AuthState) => {
      state.status = "pending";
      state.message = null;
    });
    builder.addCase(login.fulfilled, (state: AuthState, action) => {
      state.status = "success";
      state.authorized = true;
    });
    builder.addCase(login.rejected, (state: AuthState, action) => {
      state.status = "error";
      state.message = action.payload?.message || null;
      state.authorized = false;
    });
  },
});

export const { setUsername, setPassword, clearAuthStates } = AuthSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default AuthSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@storeRedux";
import { signup } from "./authThunk";

export interface AuthState {
  username: string;
  password: string;
  status: "idle" | "pending" | "error" | "success";
  message: string;
}

const initialState: AuthState = {
  username: "",
  password: "",
  status: "idle",
  message: "",
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
  },
  extraReducers: (builder) => {
    //signup
    builder.addCase(signup.pending, (state: { status: string }) => {
      state.status = "pending";
    });
    builder.addCase(
      signup.fulfilled,
      (state: { status: string; message: any }, { payload }: any) => {
        state.status = "success";
        state.message = payload;
      }
    );
    builder.addCase(
      signup.rejected,
      (
        state: { status: string; message: string },
        action: { payload: any }
      ) => {
        state.status = "error";
        state.message = action.payload;
      }
    );
  },
});

export const { setUsername, setPassword } = AuthSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default AuthSlice.reducer;

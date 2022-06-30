import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "@/pages/auth/authSlice";
import usersReducer from "@/pages/user/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

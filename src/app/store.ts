import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "@/pages/auth/authSlice";
import usersReducer from "@/pages/user/usersSlice";
import chatReducer from "@/pages/chat/chatSlice";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { chatMiddleware } from "./middlewares/chatMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([chatMiddleware]);
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

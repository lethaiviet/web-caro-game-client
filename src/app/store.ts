import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "@/pages/auth/authSlice";
import usersReducer from "@/pages/user/usersSlice";
import chatReducer from "@/pages/chat/chatSlice";
import gameReducer from "@/pages/game/gameSlice";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { chatMiddleware } from "./middlewares/chatMiddleware";
import { gameMiddleware } from "./middlewares/gameMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    chat: chatReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([chatMiddleware, gameMiddleware]);
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

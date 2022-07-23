import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionChat, selectChat } from "@/pages/chat/chatSlice";
import { actionGame, selectGame } from "@/pages/game/gameSlice";
import { useEffect } from "react";

export const useConnectSocket = () => {
  const { isConnected: isGameConnected } = useAppSelector(selectGame);
  const { isConnected: isChatConnected } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isGameConnected) return;
    dispatch(actionGame.startConnection());
  }, [isGameConnected, dispatch]);

  useEffect(() => {
    if (isChatConnected) return;
    dispatch(actionChat.startConnection());
  }, [isChatConnected, dispatch]);

  return isGameConnected && isChatConnected;
};

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionChat, selectChat } from "@/pages/chat/chatSlice";
import { useEffect } from "react";

export const useUsersStates = () => {
  const { usersStates, isConnected } = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConnected && useUsersStates.length === 0) {
      dispatch(actionChat.requestGetAllUsersState());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return usersStates;
};

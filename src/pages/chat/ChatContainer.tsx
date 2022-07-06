import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect } from "react";
import { actionChat, selectChat } from "./chatSlice";
import { ChatBox, SideBarChat } from "./components";

export default function ChatContainer() {
  const dispatch = useAppDispatch();
  const { isConnected, usersStates } = useAppSelector(selectChat);

  useEffect(() => {
    if (isConnected) dispatch(actionChat.requestGetAllUsersState());
  }, [isConnected]);

  return (
    <div className="d-flex flex-wrap">
      <SideBarChat />
      <ChatBox></ChatBox>
    </div>
  );
}

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
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
      {usersStates ? (
        <SideBarChat data={usersStates} />
      ) : (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="grow"></Spinner>
        </Container>
      )}
      <ChatBox></ChatBox>
    </div>
  );
}

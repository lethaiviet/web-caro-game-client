import { useAppDispatch, useAppSelector } from "@/app/hook";
import { selectUsers } from "@/pages/user/usersSlice";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { actionChat, selectChat } from "../chatSlice";
import { SendFill } from "react-bootstrap-icons";

export default function ChatMessage() {
  const dispacth = useAppDispatch();
  const { selectedChatter } = useAppSelector(selectChat);
  const { currentUser } = useAppSelector(selectUsers);

  const [message, setMessage] = useState("");
  const handleChat = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  };

  const handleSendMessage = () => {
    if (message === "") return;
    dispacth(
      actionChat.sendPrivateMessageToRoom({
        from: currentUser._id,
        to: selectedChatter._id,
        content: message,
      })
    );
    setMessage("");
  };

  const handleSendMessageByKeyBoard = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    setMessage("");
  }, [selectedChatter]);

  return (
    <div className="w-100 border-bottom">
      <div className="P-20 position-relative b-0">
        <input
          className="message-to-send"
          type="text"
          placeholder="Chat something..."
          value={message}
          onChange={handleChat}
          onKeyDown={handleSendMessageByKeyBoard}
        />
        <Button className="send-btn" onClick={handleSendMessage}>
          <SendFill color="white" />
        </Button>
      </div>
    </div>
  );
}

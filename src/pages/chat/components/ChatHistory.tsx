import { useAppSelector } from "@/app/hook";
import { selectUsers } from "@/pages/user/usersSlice";
import { formatTimeChat, sortMessagesByTime } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { selectChat } from "../chatSlice";

interface MessageHistoryProps {
  name: string;
  createAt: string;
  content: string;
}

function OtherMessageHistory({ name, createAt, content }: MessageHistoryProps) {
  return (
    <div className="message-data">
      <span className="message-data-name pR-10">{name}</span>
      <span className="message-data-time">{createAt}</span>
      <div className="message other-message">{content}</div>
    </div>
  );
}

function MyMessageHistory({ name, createAt, content }: MessageHistoryProps) {
  return (
    <div className="message-data float-end text-end">
      <span className="message-data-time pR-10">{createAt}</span>
      <span className="message-data-name">{name}</span>
      <div className="message my-message float-end text-end">{content}</div>
    </div>
  );
}

export default function ChatHistory() {
  const { messagesCurrentChater, selectedChatter } = useAppSelector(selectChat);
  const { currentUser } = useAppSelector(selectUsers);
  const [sortedMessages, setSortedMessages] = useState(messagesCurrentChater);

  useEffect(() => {
    console.log(
      "ChatHistory setSortedMessages(sortMessagesByTime(messagesCurrentChater));"
    );
    console.log(messagesCurrentChater);
    setSortedMessages(sortMessagesByTime(messagesCurrentChater));
  }, [messagesCurrentChater]);

  return (
    <div className="w-100 border-bottom chat-history">
      <Scrollbars
        ref={(scrollbar) => {
          scrollbar?.scrollToBottom();
        }}
      >
        <Stack>
          {sortedMessages.map((message) => {
            const createAt = formatTimeChat(message.created_at);
            if (message.senderId.toString() === currentUser._id.toString()) {
              return (
                <MyMessageHistory
                  name={currentUser.name}
                  content={message.content}
                  createAt={createAt}
                />
              );
            } else {
              return (
                <OtherMessageHistory
                  name={selectedChatter.name}
                  content={message.content}
                  createAt={createAt}
                />
              );
            }
          })}
        </Stack>
      </Scrollbars>
    </div>
  );
}

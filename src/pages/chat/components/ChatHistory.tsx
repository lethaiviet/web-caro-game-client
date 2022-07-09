import { useAppSelector } from "@/app/hook";
import { selectUsers } from "@/pages/user/usersSlice";
import { formatTimeChat, sortMessagesByTime } from "@/utils/utils";
import { createRef, useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars-2";
import { selectChat } from "../chatSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
    setSortedMessages(sortMessagesByTime(messagesCurrentChater));
  }, [messagesCurrentChater]);

  return (
    <div className="w-100 border-bottom chat-history">
      <Scrollbars
        ref={(scrollbar) => {
          scrollbar?.scrollToBottom();
        }}
      >
        <TransitionGroup className="messages-in-room">
          <Stack>
            {sortedMessages.map((message) => {
              const createAt = formatTimeChat(message.created_at);
              const nodeRef = createRef<any>();
              if (message.senderId.toString() === currentUser._id.toString()) {
                return (
                  <CSSTransition
                    in={true}
                    key={message._id.toString()}
                    timeout={1000}
                    classNames="item"
                    nodeRef={nodeRef}
                  >
                    <div ref={nodeRef}>
                      <MyMessageHistory
                        name={currentUser.name}
                        content={message.content}
                        createAt={createAt}
                      />
                    </div>
                  </CSSTransition>
                );
              } else {
                return (
                  <CSSTransition
                    in={true}
                    key={message._id.toString()}
                    timeout={1000}
                    classNames="item"
                    nodeRef={nodeRef}
                  >
                    <div ref={nodeRef}>
                      <OtherMessageHistory
                        name={selectedChatter.name}
                        content={message.content}
                        createAt={createAt}
                      />
                    </div>
                  </CSSTransition>
                );
              }
            })}
          </Stack>
        </TransitionGroup>
      </Scrollbars>
    </div>
  );
}

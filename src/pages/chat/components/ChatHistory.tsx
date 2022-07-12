import { useAppSelector } from "@/app/hook";
import { selectUsers } from "@/pages/user/usersSlice";
import { formatTimeChat, sortMessagesByTime } from "@/utils/utils";
import {
  createRef,
  useEffect,
  forwardRef,
  useState,
  ForwardedRef,
} from "react";
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

const OtherMessageHistoryWithAnimation = forwardRef<MessageHistoryProps, any>(
  (props: MessageHistoryProps, ref: ForwardedRef<any>) => {
    return (
      <CSSTransition in={true} classNames="item" timeout={1000} nodeRef={ref}>
        <div ref={ref}>
          <OtherMessageHistory
            name={props.name}
            content={props.content}
            createAt={props.createAt}
          />
        </div>
      </CSSTransition>
    );
  }
);

const MyMessageHistoryWithAnimation = forwardRef<MessageHistoryProps, any>(
  (props: MessageHistoryProps, ref: ForwardedRef<any>) => {
    return (
      <CSSTransition in={true} classNames="item" timeout={1000} nodeRef={ref}>
        <div ref={ref}>
          <MyMessageHistory
            name={props.name}
            content={props.content}
            createAt={props.createAt}
          />
        </div>
      </CSSTransition>
    );
  }
);

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
              const isRead = message.readBy.includes(
                currentUser._id.toString()
              );

              if (message.senderId.toString() === currentUser._id.toString()) {
                return (
                  <MyMessageHistory
                    key={message._id.toString()}
                    name={currentUser.name}
                    content={message.content}
                    createAt={createAt}
                  />
                );
              } else {
                return (
                  <>
                    {isRead ? (
                      <OtherMessageHistory
                        key={message._id.toString()}
                        name={selectedChatter.name}
                        content={message.content}
                        createAt={createAt}
                      />
                    ) : (
                      <OtherMessageHistoryWithAnimation
                        key={message._id.toString()}
                        ref={nodeRef}
                        name={selectedChatter.name}
                        content={message.content}
                        createAt={createAt}
                      />
                    )}
                  </>
                );
              }
            })}
          </Stack>
        </TransitionGroup>
      </Scrollbars>
    </div>
  );
}

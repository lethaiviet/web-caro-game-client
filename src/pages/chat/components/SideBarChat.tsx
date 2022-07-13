//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatSearch from "./ChatSearch";
import React, { useCallback, useEffect, useState } from "react";

import Contact from "./Contact";
import { UserStates } from "@/interfaces/users.interface";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionChat, selectChat } from "../chatSlice";
import { selectUsers } from "@/pages/user/usersSlice";

const SideBarChat = () => {
  const dispatch = useAppDispatch();
  const { selectedChatter, allMessages, usersStates, messagesCurrentChater } =
    useAppSelector(selectChat);
  const { currentUser } = useAppSelector(selectUsers);
  const [wordSearch, setWordSearch] = useState("");
  const [filteredData, setFilteredData] = useState<UserStates[]>(usersStates);

  const handleSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setWordSearch(target.value);
  };

  const countNotificationByUserId = useCallback(
    (userId: string) => {
      const findIdx = allMessages.findIndex((x) => x.roomName === userId);
      return findIdx < 0 ? 0 : allMessages[findIdx].countNotification;
    },
    [allMessages]
  );

  const countNotificationCurrentChater = useCallback(() => {
    return messagesCurrentChater.reduce(
      (total, message) =>
        (total += message.readBy.includes(currentUser._id) ? 0 : 1),
      0
    );
  }, [messagesCurrentChater]);

  useEffect(() => {
    if (countNotificationCurrentChater() > 0) {
      const timer = setTimeout(() => {
        dispatch(
          actionChat.markAsReadAllMessagesInPrivateChatRoom(selectedChatter._id)
        );
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatter, countNotificationCurrentChater]);

  useEffect(() => {
    setFilteredData(
      usersStates.filter(
        (x) => x.name.includes(wordSearch) && x._id !== currentUser._id
      )
    );
  }, [usersStates, wordSearch]);

  return (
    <div className="side-bar-chat">
      <ChatSearch onChange={handleSearch} />
      <div className="scoll-bar-chat border-end">
        <Scrollbars>
          {filteredData.map((x) => (
            <Contact
              key={x._id}
              data={x}
              selected={selectedChatter._id.toString() === x._id.toString()}
              countNotification={countNotificationByUserId(x._id)}
              onClick={() => {
                dispatch(
                  actionChat.requestGetAllMessagesInRoom(x._id.toString())
                );
              }}
            />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default SideBarChat;

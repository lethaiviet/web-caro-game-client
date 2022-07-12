//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatSearch from "./ChatSearch";
import React, { useEffect, useState } from "react";

import Contact from "./Contact";
import { UserStates } from "@/interfaces/users.interface";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionChat, selectChat } from "../chatSlice";

const SideBarChat = () => {
  const dispatch = useAppDispatch();
  const { selectedChatter, allMessages, usersStates } =
    useAppSelector(selectChat);
  const [wordSearch, setWordSearch] = useState("");
  const [filteredData, setFilteredData] = useState<UserStates[]>(usersStates);

  const handleSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setWordSearch(target.value);
  };

  const getNumOfNotifications = (userStates: UserStates) => {
    const findIdx = allMessages.findIndex((x) => x.roomName === userStates._id);
    return findIdx < 0 ? 0 : allMessages[findIdx].countNotification;
  };

  useEffect(() => {
    if (selectedChatter._id !== "") {
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
  }, [selectedChatter]);

  useEffect(() => {
    setFilteredData(usersStates.filter((x) => x.name.includes(wordSearch)));
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
              countNotification={getNumOfNotifications(x)}
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

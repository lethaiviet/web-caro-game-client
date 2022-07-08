//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatSearch from "./ChatSearch";
import React, { memo, useEffect, useState } from "react";

import Contact from "./Contact";
import { UserStates } from "@/interfaces/users.interface";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { actionChat, selectChat } from "../chatSlice";

interface SideBarChatProps {
  data: UserStates[];
}

const SideBarChat = ({ data }: SideBarChatProps) => {
  const dispatch = useAppDispatch();
  const { selectedChatter } = useAppSelector(selectChat);
  const [wordSearch, setWordSearch] = useState("");
  const [filteredData, setFilteredData] = useState<UserStates[]>(data);

  const handleSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setWordSearch(target.value);
  };

  useEffect(() => {
    setFilteredData(data.filter((x) => x.name.includes(wordSearch)));
  }, [data, wordSearch]);

  return (
    <div className="side-bar-chat">
      <ChatSearch onChange={handleSearch} />
      <Scrollbars className="scoll-bar-chat">
        {filteredData.map((x) => (
          <Contact
            key={x._id}
            data={x}
            selected={selectedChatter._id.toString() === x._id.toString()}
            onClick={() => {
              dispatch(
                actionChat.requestGetAllMessagesInRoom(x._id.toString())
              );
            }}
          />
        ))}
      </Scrollbars>
    </div>
  );
};

export default memo(SideBarChat);

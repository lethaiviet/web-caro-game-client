//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatSearch from "./ChatSearch";
import { memo } from "react";

import Contact from "./Contact";
import { UserStates } from "@/interfaces/users.interface";

interface SideBarChatProps {
  data: UserStates[];
}

const SideBarChat = ({ data }: SideBarChatProps) => {
  return (
    <div className="side-bar-chat">
      <ChatSearch />
      <Scrollbars className="scoll-bar-chat">
        {data.map((x) => (
          <Contact key={x._id} data={x} />
        ))}
      </Scrollbars>
    </div>
  );
};

export default memo(SideBarChat);

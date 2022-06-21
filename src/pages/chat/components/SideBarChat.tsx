//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatSearch from "./ChatSearch";

import Contact from "./Contact";

const data = Array.from({ length: 30 }, (i) => i);

export default function SideBarChat() {
  return (
    <div className="side-bar-chat">
      <ChatSearch />
      <Scrollbars className="scoll-bar-chat">
        {data.map((x) => (
          <Contact />
        ))}
      </Scrollbars>
    </div>
  );
}

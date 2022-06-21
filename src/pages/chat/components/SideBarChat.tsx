//@ts-ignore
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatSearch from "./ChatSearch";

import Contact from "./Contact";
import { PAGES__CHAT__SIDE_BAR_CHAT } from "@/config/const";

const data = Array.from({ length: 30 }, (i) => i);

export default function SideBarChat() {
  return (
    <div className="side-bar-chat">
      <ChatSearch />
      <Scrollbars style={{ height: PAGES__CHAT__SIDE_BAR_CHAT }}>
        {data.map((x) => (
          <Contact />
        ))}
      </Scrollbars>
    </div>
  );
}

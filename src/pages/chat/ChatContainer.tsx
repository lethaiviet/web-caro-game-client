import { ChatBox, SideBarChat } from "./components";

export default function ChatContainer() {
  return (
    <div className="d-flex flex-wrap">
      <SideBarChat />
      <ChatBox></ChatBox>
    </div>
  );
}

import { useAppSelector } from "@/app/hook";
import { selectUsers } from "@/pages/user/usersSlice";
import ChatHistory from "./ChatHistory";
import ChatMessage from "./ChatMessage";
import Contact from "./Contact";

export default function ChatBox() {
  const { currentUser } = useAppSelector(selectUsers);

  return (
    <div className="chat-box">
      <Contact data={{ ...currentUser, status: "Online" }} />
      <ChatHistory></ChatHistory>
      <ChatMessage></ChatMessage>
    </div>
  );
}

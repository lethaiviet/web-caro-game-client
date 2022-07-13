import { useAppSelector } from "@/app/hook";
import { selectChat } from "../chatSlice";
import ChatHistory from "./ChatHistory";
import ChatMessage from "./ChatMessage";
import Contact from "./Contact";

export default function ChatBox() {
  const { selectedChatter } = useAppSelector(selectChat);

  return (
    <>
      {selectedChatter.name !== "" && (
        <div className="chat-box">
          <Contact key={selectedChatter._id} data={selectedChatter} />
          <ChatHistory></ChatHistory>
          <ChatMessage></ChatMessage>
        </div>
      )}
    </>
  );
}

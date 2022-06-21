import ChatHistory from "./ChatHistory";
import ChatMessage from "./ChatMessage";
import Contact from "./Contact";

export default function ChatBox() {
  return (
    <div className="chat-box">
      <Contact />
      <ChatHistory></ChatHistory>
      <ChatMessage></ChatMessage>
    </div>
  );
}

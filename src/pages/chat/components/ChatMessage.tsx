import { Button } from "react-bootstrap";

export default function ChatMessage() {
  return (
    <div className="w-100 border-bottom">
      <div className="P-20 position-relative b-0">
        <input
          className="message-to-send"
          type="text"
          placeholder="Chat something..."
        />
        <Button className="send-btn" />
      </div>
    </div>
  );
}

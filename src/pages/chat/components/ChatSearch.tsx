import { PAGES__CHAT__CHAT_SEARCH } from "@/config/const";

export default function ChatSearch() {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      className="w-100 border-1 border-top-0"
      style={{
        borderColor: "#dee2e6",
        outline: "none",
        padding: "15px",
        height: `${PAGES__CHAT__CHAT_SEARCH}px`,
      }}
    />
  );
}

interface ChatSearchProps {
  onChange: (e: React.ChangeEvent) => void;
}

export default function ChatSearch({ onChange }: ChatSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      className="chat-search w-100 border-1 border-top-0"
      onChange={onChange}
    />
  );
}

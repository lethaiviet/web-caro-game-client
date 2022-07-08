import { DetailMessage } from "@/interfaces/chat-messages.interface";
import { compareAsc, format, parseISO } from "date-fns";

export const getFirstLetter = (str: string): string => {
  if (str === "") return "A";
  return str.charAt(0).toUpperCase();
};

export const getAvatarTemplate = (name: string, size: number): string => {
  const firstLetter = getFirstLetter(name);
  return `https://via.placeholder.com/${size}?text=${firstLetter}`;
};

export const getCurrentTime = (): string => {
  return new Date().toISOString().slice(0, -1) + "+00:00";
};

export const formatTimeChat = (dateString: string): string => {
  return format(parseISO(dateString), "MMM dd, h:mm aa");
};

export const sortMessagesByTime = (
  messages: DetailMessage[]
): DetailMessage[] => {
  if (messages.length < 2) return messages;

  return [...messages].sort((a, b) =>
    compareAsc(parseISO(a.created_at), parseISO(b.created_at))
  );
};

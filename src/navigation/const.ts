export const ROOT = "/";
export const LOGIN = "/login";
export const CHAT = "/chat";
export const USER_PROFILE = "/user-profile";
export const PLAY_FOR_FUN = "/play-for-fun";
export const LOBBY = "/lobby/:roomId";
export const GAME = "/game/:roomId";
export const ERROR_500 = "/500";
export const OTHERS = "/*";

export const PAGES_NAME_MAP = {
  [ROOT]: "Home",
  [CHAT]: "Pricate Chat",
  [USER_PROFILE]: "My Profile",
  [PLAY_FOR_FUN]: "Play For Fun",
  [LOBBY]: "Lobby",
};

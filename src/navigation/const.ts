export const ROOM_ID_PARAM = ":roomId";

export const ROOT = "/";
export const LOGIN = "/login";
export const CHAT = "/chat";
export const USER_PROFILE = "/user-profile";
export const PLAY_FOR_FUN = "/play-for-fun";
export const LOBBY = "/lobby/" + ROOM_ID_PARAM;
export const GAME = "/game/" + ROOM_ID_PARAM;
export const ERROR_500 = "/500";
export const ERROR_400 = "/400";
export const OTHERS = "/*";
export const PAGES_NAME_MAP = {
  [ROOT]: "Home",
  [CHAT]: "Private Chat",
  [USER_PROFILE]: "My Profile",
  [PLAY_FOR_FUN]: "Play For Fun",
  [LOBBY]: "Lobby",
};

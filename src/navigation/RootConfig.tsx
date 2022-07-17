import Header from "@/layouts/Header";
import Chat from "@/pages/chat";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Page404 from "@/pages/others/Page404";
import Page500 from "@/pages/others/Page500";
import { Routes, Route } from "react-router-dom";
import {
  LOGIN,
  ROOT,
  CHAT,
  OTHERS,
  ERROR_500,
  USER_PROFILE,
  PLAY_FOR_FUN,
  LOBBY,
  GAME,
} from "./const";
import { PrivateRoot } from "./PrivateRoot";
import UserProfile from "@/pages/user";
import PlayForFun from "@/pages/play-for-fun";
import Lobby from "@/pages/lobby";
import Game from "@/pages/game";

function RootConfig() {
  return (
    <div>
      <Routes>
        {/* <Route element={<PrivateRoot />}> */}
        <Route path={ROOT} element={<Header />}>
          <Route path={CHAT} element={<Chat />} />
          <Route path={ROOT} element={<Home />} />
          <Route path={USER_PROFILE} element={<UserProfile />} />
          <Route path={PLAY_FOR_FUN} element={<PlayForFun />} />
          <Route path={LOBBY} element={<Lobby />} />
        </Route>
        <Route path={GAME} element={<Game />} />
        {/* </Route> */}

        <Route path={LOGIN} element={<Auth />} />
        <Route path={ERROR_500} element={<Page500 />} />
        <Route path={OTHERS} element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default RootConfig;

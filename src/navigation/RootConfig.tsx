import Header from "@/layouts/Header";
import Chat from "@/pages/chat";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Page404 from "@/pages/others/Page404";
import { Routes, Route } from "react-router-dom";
import { LOGIN, ROOT, CHAT, OTHERS } from "./const";

function RootConfig() {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Header />}>
          <Route path={ROOT} element={<Home />} />
        </Route>
        <Route path={LOGIN} element={<Login />} />
        <Route path={CHAT} element={<Chat />} />
        <Route path={OTHERS} element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default RootConfig;

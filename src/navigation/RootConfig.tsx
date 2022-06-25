import Header from "@/layouts/Header";
import Chat from "@/pages/chat";
import Home from "@/pages/home";
import Auth from "@/pages/auth";
import Page404 from "@/pages/others/Page404";
import Page500 from "@/pages/others/Page500";
import { Routes, Route } from "react-router-dom";
import { LOGIN, ROOT, CHAT, OTHERS, ERROR_500 } from "./const";
import { PrivateRoot } from "./PrivateRoot";

function RootConfig() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoot />}>
          <Route path={ROOT} element={<Header />}>
            <Route path={CHAT} element={<Chat />} />
            <Route path={ROOT} element={<Home />} />
          </Route>
        </Route>
        <Route path={LOGIN} element={<Auth />} />
        <Route path={ERROR_500} element={<Page500 />} />
        <Route path={OTHERS} element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default RootConfig;

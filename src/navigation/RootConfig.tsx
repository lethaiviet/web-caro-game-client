import Header from "@/layouts/Header";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Page404 from "@/pages/others/Page404";
import { Routes, Route } from "react-router-dom";
import { LOGIN, ROOT, OTHERS } from "./const";

function RootConfig() {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Header />}>
          <Route path={ROOT} element={<Home />} />
        </Route>
        <Route path={LOGIN} element={<Login />} />
        <Route path={OTHERS} element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default RootConfig;

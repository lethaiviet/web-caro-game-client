import Header from "@/layouts/Header";
import Home from "@/pages/home";
import Login from "@/pages/login";
import { Routes, Route } from "react-router-dom";
import { LOGIN, ROOT } from "./const";

function RootConfig() {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Header />}>
          <Route path={ROOT} element={<Home />} />
        </Route>
        <Route path={LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default RootConfig;

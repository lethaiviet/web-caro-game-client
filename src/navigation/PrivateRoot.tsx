import { useAppSelector } from "@/app/hook";
import { selectAuth } from "@/pages/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "./const";

export function PrivateRoot() {
  const { status } = useAppSelector(selectAuth);
  console.log(status);
  return status === "success" ? <Outlet /> : <Navigate to={LOGIN} />;
}

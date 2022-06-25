import { useAppSelector } from "@/app/hook";
import { selectAuth } from "@/pages/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "./const";

export function PrivateRoot() {
  const { authorized } = useAppSelector(selectAuth);
  return authorized ? <Outlet /> : <Navigate to={LOGIN} />;
}

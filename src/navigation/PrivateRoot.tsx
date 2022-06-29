import { useAppDispatch, useAppSelector } from "@hookRedux";
import { selectAuth } from "@/pages/auth/authSlice";
import { checkAccessToken } from "@/pages/auth/authThunk";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "./const";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

export function PrivateRoot() {
  const { authorized } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const dispatchCheckAccessToken = async () => {
      if (!authorized) {
        await dispatch(checkAccessToken());
        setLoading(false);
      }
    };

    dispatchCheckAccessToken();
    // eslint-disable-next-line
  }, []);

  return authorized ? (
    <Outlet />
  ) : loading ? (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="grow"></Spinner>
    </Container>
  ) : (
    <Navigate to={LOGIN} />
  );
}

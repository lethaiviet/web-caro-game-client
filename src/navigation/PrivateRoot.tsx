import { useAppDispatch, useAppSelector } from "@hookRedux";
import { selectAuth } from "@/pages/auth/authSlice";
import { checkAccessToken } from "@/pages/auth/authThunk";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN } from "./const";
import { useEffect, useState } from "react";
import StorageService, { SECTION_ITEMS } from "@/services/storage.service";
import Loading from "@/pages/loading";

export function PrivateRoot() {
  const { authorized } = useAppSelector(selectAuth);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  //check section to verify that user logined or not
  //avoid show the spin screen when reload page
  //(section is removed when closing window and it still exist when reloading window)
  const isAuth =
    StorageService.getSectionStorageItem(SECTION_ITEMS.IS_AUTH) === "true";

  useEffect(() => {
    const dispatchCheckAccessToken = async () => {
      if (!(authorized || isAuth)) {
        await dispatch(checkAccessToken());
        setLoading(false);
      }
    };

    dispatchCheckAccessToken();
    // eslint-disable-next-line
  }, []);

  return authorized || isAuth ? (
    <Outlet />
  ) : loading ? (
    <Loading />
  ) : (
    <Navigate to={LOGIN} />
  );
}

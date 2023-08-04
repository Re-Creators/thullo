import React from "react";
import useUserStore from "../store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = useUserStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/signin" />;
}

import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="mt-[70px] py-1">
      <Outlet />
    </div>
  );
}

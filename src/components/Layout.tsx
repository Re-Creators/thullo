import { Outlet } from "react-router-dom";
import useErrorStore, { ERROR_CODES } from "../store/useErrorStore";

const renderChildren = (errorCode: string | null) => {
  if (errorCode === ERROR_CODES.INVALID_UID) return <p>Board Not found</p>;
  if (errorCode === ERROR_CODES.PRIVATE) return <p>Board is Private</p>;
  return <Outlet />;
};
export default function Layout() {
  const errorCode = useErrorStore((state) => state.errorCode);

  return <div className="mt-1 grow">{renderChildren(errorCode)}</div>;
}

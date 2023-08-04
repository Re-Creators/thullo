import React from "react";
import useLoadingStore from "../store/useLoadingStore";

interface Props {
  children: React.ReactNode;
}
export default function LoadingManager({ children }: Props) {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return isLoading ? (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <>{children}</>
  );
}

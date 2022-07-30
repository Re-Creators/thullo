import { useEffect, useRef } from "react";

export default function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

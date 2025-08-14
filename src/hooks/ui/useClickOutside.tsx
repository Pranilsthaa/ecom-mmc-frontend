import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement> | null,
  handler: () => void,
  isActive = true
) => {
  useEffect(() => {
    if (!isActive || !ref) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, isActive]);
};

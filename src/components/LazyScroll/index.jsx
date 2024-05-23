import { useCallback, useEffect } from "react";

export default function LazyScroll({ onWindowScrollReachEnd, ...props }) {
  const rootDiv = document.getElementById("root");

  const handleScroll = useCallback(() => {
    if (rootDiv.offsetHeight + rootDiv.scrollTop >= rootDiv.scrollHeight - 10) {
      onWindowScrollReachEnd && onWindowScrollReachEnd();
    }
  }, [onWindowScrollReachEnd, rootDiv]);

  useEffect(() => {
    if (rootDiv) {
      rootDiv.addEventListener("scroll", handleScroll);
      return () => {
        rootDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, [rootDiv, handleScroll]);

  return props.children;
}

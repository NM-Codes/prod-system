import { useRef, useState } from "react";

/*
  useTimer
  ----------
  Custom hook som hanterar timer-logik.
  - Baserad på timestamps (Date.now)
*/

export function useTimer() {
  const startRef = useRef(null); // lagrar starttid som inte triggar re-render
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    startRef.current = Date.now();
    setIsRunning(true);
  }

  function stop() {
    if (!startRef.current) return null;

    const end = Date.now();
    const start = startRef.current;

    setIsRunning(false);
    startRef.current = null;

    return { start, end };
  }

  return {
    isRunning,
    start,
    stop,
  };
}

import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css";

/*
  Timer ansvarar ENBART för:
  - tidräkning
  - start / stop / reset
  - export av start + stop tid via onStop
*/

function Timer({ onStop }) {
  const [milliseconds, setMilliseconds] = useState(0);

  const intervalRef = useRef(null);
  const startTimestampRef = useRef(null);

  //Omvandlar ms till format hh:mm:ss
  const time = {
    hours: Math.floor(milliseconds / 3600000),
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
  };

  //START
  function handleStart() {
    if (isRunning) return; //skydd mot dubbel-start

    if (!startTimestampRef.current) {
      startTimestampRef.current = new Date();
    }

    setIsRunning(true);
  }

  //STOP
  function handleStop() {
    if (!isRunning) return;

    setIsRunning(false);

    const endTimestamp = new Date();
    const startTimestamp = startTimestampRef.current;

    if (!startTimestamp) return;

    onStop({
      date: startTimestamp.toISOString().split("T")[0],
      startTime: startTimestamp.toLocaleTimeString("sv-SE"),
      endTime: endTimestamp.toLocaleTimeString("sv-SE"),
    });
  }

  //RESET
  function handleReset() {
    setIsRunning(false);
    setMilliseconds(0);
    startTimestampRef.current = null;
  }

  //Logik för timer räkningen
  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setMilliseconds((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className={styles.timer}>
      <div className="time-display">
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </div>

      <div className={styles.buttons}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;

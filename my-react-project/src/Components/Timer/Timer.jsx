import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css";

function Timer({ focusMinutes, onStart, onStop, control }) {

  const [milliseconds, setMilliseconds] = useState(0);

  const intervalRef = useRef(null);
  const startTimestampRef = useRef(null);

  const durationMs = focusMinutes ? focusMinutes * 60000 : null;

  /* VISA TID */
  const time = {
    minutes: Math.floor(milliseconds / 60000),
    seconds: Math.floor(milliseconds / 1000) % 60,
  };

  /* START */
  function handleStart() {

    if (!startTimestampRef.current) {
      startTimestampRef.current = new Date();
    }

    setMilliseconds(0);

    intervalRef.current = setInterval(() => {

      setMilliseconds((prev) => {

        const newTime = prev + 1000;

        /* STOPP VID VALD TID */
        if (durationMs && newTime >= durationMs) {
          clearInterval(intervalRef.current);

          handleStop();

          return durationMs;
        }

        return newTime;
      });

    }, 1000);

    if (onStart) onStart();
  }

  /* PAUS */
  function handlePause() {
    clearInterval(intervalRef.current);
  }

  /* FORTSÄTT */
  function handleResume() {

    intervalRef.current = setInterval(() => {

      setMilliseconds((prev) => {

        const newTime = prev + 1000;

        if (durationMs && newTime >= durationMs) {
          clearInterval(intervalRef.current);
          handleStop();
          return durationMs;
        }

        return newTime;
      });

    }, 1000);
  }

  /* STOPP */
  function handleStop() {

    clearInterval(intervalRef.current);

    const endTimestamp = new Date();
    const startTimestamp = startTimestampRef.current;

    if (!startTimestamp) return;

    if (onStop) {
      onStop({
        startTimestamp: startTimestamp.getTime(),
        endTimestamp: endTimestamp.getTime(),
      });
    }

    setMilliseconds(0);
    startTimestampRef.current = null;
  }

  /* WORKSESSION KONTROLLERAR TIMER */
  useEffect(() => {

    if (!control) return;

    if (control === "start") handleStart();
    if (control === "pause") handlePause();
    if (control === "resume") handleResume();
    if (control === "stop") handleStop();

  }, [control]);

  /* CLEANUP */
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (

    <div className={styles.timer}>

      <div className={styles.circle}>
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </div>

    </div>

  );
}

export default Timer;
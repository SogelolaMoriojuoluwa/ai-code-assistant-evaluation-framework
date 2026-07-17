import { useEffect, useState } from "react";

export default function Timer({ running }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="timer-box">
      <h5>Elapsed Time</h5>
      <h2>{formatTime()}</h2>
    </div>
  );
}
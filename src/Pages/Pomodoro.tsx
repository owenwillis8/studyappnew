import React, { useState, useEffect, useRef } from "react";
import "../Pages/Pomodoro.css";

const WORK_TIME = 25 * 60; 
const BREAK_TIME = 5 * 60;

const Pomodoro: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            setOnBreak((prevMode) => !prevMode);
            return onBreak ? WORK_TIME : BREAK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, onBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setOnBreak(false);
    setSecondsLeft(WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="pomodoro-page">
      <div className="pomodoro-container">
        <h1 className="pomodoro-title">Pomodoro Timer</h1>
        <h2 className={`session-label ${onBreak ? "break" : "focus"}`}>
          {onBreak ? "Break Time" : "Focus Time"}
        </h2>
        <div className="timer-display">{formatTime(secondsLeft)}</div>

        <div className="button-group">
          <button onClick={toggleTimer} className="btn primary">
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={resetTimer} className="btn secondary">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;

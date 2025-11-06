
import React, { useEffect, useRef, useState } from "react";
import "../Pages/Pomodoro.css";
import rainSound from "../assets/rain.mp3"; 

const Pomodoro: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCounter, setBreathCounter] = useState(4);


  useEffect(() => {
    if (isRunning && !isBreak) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsBreak(true);
            setSecondsLeft(5 * 60);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, isBreak]);


  useEffect(() => {
    if (!audioRef.current) return;
    if (isRunning && !isBreak) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isRunning, isBreak]);


  useEffect(() => {
    if (isBreak) {
      const breathInterval = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            if (breathPhase === "inhale") setBreathPhase("hold");
            else if (breathPhase === "hold") setBreathPhase("exhale");
            else if (breathPhase === "exhale") setBreathPhase("inhale");
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(breathInterval);
    }
  }, [isBreak, breathPhase]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setSecondsLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
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
      <audio ref={audioRef} src={rainSound} loop />

      <h2>Pomodoro Timer</h2>

      {!isBreak ? (
        <>
          <div className="timer">{formatTime(secondsLeft)}</div>
          <div className="controls">
            <button onClick={toggleTimer} className="cta">
              {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={resetTimer} className="reset-btn">
              Reset
            </button>
          </div>
        </>
      ) : (
        <div className="breathing-session">
          <h3>Take a Guided Break 🌿</h3>
          <p className="phase">{breathPhase.toUpperCase()}</p>
          <div className={`breath-circle ${breathPhase}`}></div>
          <p className="counter">{breathCounter}s</p>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;

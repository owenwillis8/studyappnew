import React, { useEffect, useRef, useState } from "react";
import "../Pages/Pomodoro.css";
import StudySessionLayout from "../components/StudySessionsTemplate";

const Pomodoro: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * .5);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [breathPhase, setBreathPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [breathCounter, setBreathCounter] = useState(4);

  
  useEffect(() => {
    if (isRunning && !isBreak) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsBreak(true);
            setBreakSecondsLeft(5 * 60); 
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
    if (!isRunning || !isBreak) return;

    const id = setInterval(() => {
      setBreakSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          
          setIsBreak(false);
          setSecondsLeft(25 * 60);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, isBreak]);

  
  useEffect(() => {
    if (!isBreak) return;

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
  }, [isBreak, breathPhase]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setSecondsLeft(25 * 60);
    setBreakSecondsLeft(5 * 60);
    setIsRunning(false);
    setIsBreak(false);
    setBreathPhase("inhale");
    setBreathCounter(4);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <StudySessionLayout title="Pomodoro Timer" durationMinutes={25}>
      <div className="pomodoro-inner">
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

          {}
          <div className="break-timer">{formatTime(breakSecondsLeft)}</div>

          <p className="phase">{breathPhase.toUpperCase()}</p>

          <div className={`breath-circle ${breathPhase}`} />

          <p className="counter">{breathCounter}s</p>
        </div>

        )}
      </div>
    </StudySessionLayout>
  );
};

export default Pomodoro;


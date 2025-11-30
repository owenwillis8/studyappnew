import React, { useEffect, useRef, useState } from "react";
import "../Pages/Pomodoro.css";
import StudySessionLayout from "../components/StudySessionsTemplate";

/* ---------------------------------------------
   CONSTANTS 
---------------------------------------------- */
const WORK_MINUTES = .05;
const BREAK_MINUTES = 5;

const WORK_SECONDS = WORK_MINUTES * 60;
const BREAK_SECONDS = BREAK_MINUTES * 60;

const BREATH_CYCLE_SECONDS = 4; 


const Pomodoro: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(BREAK_SECONDS);

  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [breathPhase, setBreathPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [breathCounter, setBreathCounter] = useState(BREATH_CYCLE_SECONDS);

  /* ---------------------------------------------
     WORK SESSION TIMER  
  ---------------------------------------------- */
  useEffect(() => {
    if (isRunning && !isBreak) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsBreak(true);
            setBreakSecondsLeft(BREAK_SECONDS);
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

  /* ---------------------------------------------
     BREAK TIMER  
  ---------------------------------------------- */
  useEffect(() => {
    if (!isRunning || !isBreak) return;

    const id = setInterval(() => {
      setBreakSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIsBreak(false);
          setSecondsLeft(WORK_SECONDS);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, isBreak]);

  /* ---------------------------------------------
     BREATHING CYCLE  
  ---------------------------------------------- */
  useEffect(() => {
    if (!isBreak) return;

    const breathInterval = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev <= 1) {
          if (breathPhase === "inhale") setBreathPhase("hold");
          else if (breathPhase === "hold") setBreathPhase("exhale");
          else setBreathPhase("inhale");

          return BREATH_CYCLE_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(breathInterval);
  }, [isBreak, breathPhase]);

  /* ---------------------------------------------
     BUTTON HANDLERS  
  ---------------------------------------------- */
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setSecondsLeft(WORK_SECONDS);
    setBreakSecondsLeft(BREAK_SECONDS);
    setIsRunning(false);
    setIsBreak(false);
    setBreathPhase("inhale");
    setBreathCounter(BREATH_CYCLE_SECONDS);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ---------------------------------------------
     RENDER  
  ---------------------------------------------- */
  return (
    <StudySessionLayout title="Pomodoro Timer" durationMinutes={WORK_MINUTES}>
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



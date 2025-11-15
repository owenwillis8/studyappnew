import React, { useEffect, useRef, useState } from "react";
import "../Pages/Pomodoro.css";
import rainSound from "../assets/rain.mp3"; 
import { supabase } from "../supabaseClient";
import SessionFeedback from "../components/SessionFeedback";

const Pomodoro: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCounter, setBreathCounter] = useState(4);

  const [showFeedback, setShowFeedback] = useState(false);


  const totalMinutes = 25;
  const user = supabase.auth.getUser(); 

  const handleSessionEnd = () => {
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = async (answers: any) => {
    const { data: authData } = await user;
    if (!authData?.user) return;

    await supabase.from("sessions").insert({
      user_id: authData.user.id,
      duration_minutes: totalMinutes,
      ...answers,
    });

    setShowFeedback(false);
    alert("Session saved successfully!");
  };

  useEffect(() => {
    if (isRunning && !isBreak) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsBreak(true);
            setSecondsLeft(5 * 60);
            handleSessionEnd(); // 
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
    if (isRunning && !isBreak) audioRef.current.play();
    else audioRef.current.pause();
  }, [isRunning, isBreak]);

  useEffect(() => {
    if (isBreak) {
      const breathInterval = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev <= 1) {
            if (breathPhase === "inhale") setBreathPhase("hold");
            else if (breathPhase === "hold") setBreathPhase("exhale");
            else setBreathPhase("inhale");
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(breathInterval);
    }
  }, [isBreak, breathPhase]);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setSecondsLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

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

      {}
      {showFeedback && (
        <SessionFeedback onSubmit={handleFeedbackSubmit} />
      )}
    </div>
  );
};

export default Pomodoro;

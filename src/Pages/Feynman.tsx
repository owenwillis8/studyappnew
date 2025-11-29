import React, { useState, useEffect } from "react";
import StudySessionLayout from "../components/StudySessionsTemplate";
import "../Pages/Pomodoro.css"; 



const FEYNMAN_STEPS = [
  {
    title: "Step 1 — Study (25 minutes)",
    instructions:
      "Review your material. When the timer finishes, move to the next step.",
    duration: 25,
  },
  {
    title: "Step 2 — Explain It Simply",
    instructions:
      "Explain the topic in simple language as if teaching a 10-year-old.",
    duration: 10,
  },
  {
    title: "Step 3 — Identify Gaps (Review)",
    instructions:
      "Return to your material and fill in the weak points you discovered.",
    duration: 10,
  },
  {
    title: "Step 4 — Simplify & Refine",
    instructions:
      "Rewrite your explanation for clarity. Remove unnecessary complexity.",
    duration: 10,
  },
];

const Feynman: React.FC = () => {
  const [step, setStep] = useState(0);
  const current = FEYNMAN_STEPS[step];

  const [timeLeft, setTimeLeft] = useState(current.duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  
  useEffect(() => {
    setTimeLeft(current.duration * 60);
    setIsRunning(false);
  }, [step]);


  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <StudySessionLayout
      title="Feynman Technique"
      durationMinutes={current.duration}
    >
      <div className="feynman-container">
        {}
        <h3 className="feynman-step-title">{current.title}</h3>
        <p className="feynman-instructions">{current.instructions}</p>

        {}
        <div className="pomodoro-timer">
          <span className="time">
            {minutes}:{seconds}
          </span>
        </div>

        {}
        <div className="pomodoro-controls">
          {!isRunning && (
            <button className="cta" onClick={() => setIsRunning(true)}>
              Start
            </button>
          )}

          {isRunning && (
            <button
              className="cta"
              onClick={() => setIsRunning(false)}
              style={{ backgroundColor: "#FFC857" }}
            >
              Pause
            </button>
          )}

          <button
            className="cta reset-btn"
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(current.duration * 60);
            }}
          >
            Reset
          </button>
        </div>

        {}
        {timeLeft === 0 && step < FEYNMAN_STEPS.length - 1 && (
          <button
            className="cta"
            onClick={() => setStep((s) => s + 1)}
            style={{ marginTop: "30px" }}
          >
            Next Step →
          </button>
        )}

        {}
        {timeLeft === 0 && step === FEYNMAN_STEPS.length - 1 && (
          <button
            className="cta end-btn"
            style={{ marginTop: "30px" }}
          >
            Complete Technique
          </button>
        )}
      </div>
    </StudySessionLayout>
  );
};

export default Feynman;


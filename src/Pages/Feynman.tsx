import React, { useState, useEffect } from "react";
import StudySessionLayout from "../components/StudySessionsTemplate";
import "../Pages/Pomodoro.css";

/* --------------------------------------------------------
   CONSTANTS
--------------------------------------------------------- */
const FEYNMAN_STUDY_MINUTES = .05;
const FEYNMAN_REVIEW_MINUTES = .05;




const STUDY_SECONDS = FEYNMAN_STUDY_MINUTES * 60
const REVIEW_SECONDS = FEYNMAN_REVIEW_MINUTES * 60

/* --------------------------------------------------------
   STEP CONFIG
--------------------------------------------------------- */
const FEYNMAN_STEPS = [
  {
    title: "Step 1 — Study (25 minutes)",
    instructions:
      "Review your material. When the timer finishes, move to the next step.",
    durationSeconds: STUDY_SECONDS,
    showTextBox: false,
  },
  {
    title: "Step 2 — Explain It Simply",
    instructions:
      "Explain the topic in simple language as if teaching a 10-year-old.",
    durationSeconds: 0,
    showTextBox: true,
  },
  {
    title: "Step 3 — Identify Gaps (Review)",
    instructions:
      "Review your simple explanation and revisit the material to fill in weak points.",
    durationSeconds: REVIEW_SECONDS,
    showTextBox: false, 
  },
  {
    title: "Step 4 — Simplify & Refine",
    instructions:
      "Rewrite your explanation for clarity. Remove unnecessary complexity.",
    durationSeconds: 0,
    showTextBox: true, 
  },
];

/* --------------------------------------------------------
   COMPONENT
--------------------------------------------------------- */
const Feynman: React.FC = () => {
  const [step, setStep] = useState(0);
  const current = FEYNMAN_STEPS[step];

  
  const [explanationStep2, setExplanationStep2] = useState("");
  const [explanationStep4, setExplanationStep4] = useState("");

  const [timeLeft, setTimeLeft] = useState(current.durationSeconds);
  const [isRunning, setIsRunning] = useState(false);

  
  useEffect(() => {
    setTimeLeft(current.durationSeconds);
    setIsRunning(false);
  }, [step, current.durationSeconds]);

  
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  
  useEffect(() => {
    if (step === 3 && explanationStep4 === "") {
      setExplanationStep4(explanationStep2);
    }
  }, [step]);

  
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  
  const getTextBinding = () => {
    if (step === 1)
      return { value: explanationStep2, setter: setExplanationStep2 };
    if (step === 3)
      return { value: explanationStep4, setter: setExplanationStep4 };
    return { value: "", setter: () => {} };
  };

  const { value: textValue, setter: setTextValue } = getTextBinding();

  return (
    <StudySessionLayout
      title="Feynman Technique"
      durationMinutes={current.durationSeconds / 60}
    >
      <div className="feynman-container">
        <h3 className="feynman-step-title">{current.title}</h3>
        <p className="feynman-instructions">{current.instructions}</p>

        {}
        {current.showTextBox && (
          <textarea
            className="mindmap-textarea"
            placeholder="Write your explanation here..."
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        )}

        {}
        {current.durationSeconds > 0 && (
          <>
            <div className="pomodoro-timer">
              <span className="time">
                {minutes}:{seconds}
              </span>
            </div>

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
                  setTimeLeft(current.durationSeconds);
                }}
              >
                Reset
              </button>
            </div>
          </>
        )}

        {}
        {(current.durationSeconds === 0 || timeLeft === 0) &&
          step < FEYNMAN_STEPS.length - 1 && (
            <button
              className="cta"
              onClick={() => setStep(step + 1)}
              style={{ marginTop: "30px" }}
            >
              Next Step →
            </button>
          )}
      </div>
    </StudySessionLayout>
  );
};

export default Feynman;

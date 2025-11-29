import React, { useState, useEffect } from "react";
import StudySessionLayout from "../components/StudySessionsTemplate";
import "../Pages/Pomodoro.css";

const SQ3R_STEPS = [
  { title: "Step 1 — Survey (Scan)", instructions: "Briefly scan the material to get an overview.", duration: 0 },
  { title: "Step 2 — Question", instructions: "Write questions based on what you scanned.", duration: 0 },
  { title: "Step 3 — Read (25 minutes)", instructions: "Read deeply to prepare to answer your questions.", duration: 25 },
  { title: "Step 4 — Recite (Answer Questions)", instructions: "Answer the questions you created earlier.", duration: 0 },
  { title: "Step 5 — Review", instructions: "Review notes, answers, & reinforce understanding.", duration: 0 },
];

const SQ3RTechnique: React.FC = () => {
  const [step, setStep] = useState(0);
  const current = SQ3R_STEPS[step];

  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  
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
    <StudySessionLayout title="SQ3R Technique" durationMinutes={current.duration}>
      <div className="feynman-container">
        <h3 className="feynman-step-title">{current.title}</h3>
        <p className="feynman-instructions">{current.instructions}</p>

        {}
        {step === 1 && (
          <div className="question-box">
            <textarea
              className="question-input"
              placeholder="Write a question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button
              className="cta"
              onClick={() => {
                if (newQuestion.trim() !== "") {
                  setQuestions([...questions, newQuestion]);
                  setNewQuestion("");
                }
              }}
            >
              Add Question
            </button>

            <div className="question-list">
              {questions.map((q, idx) => (
                <p key={idx} className="question-item">• {q}</p>
              ))}
            </div>
          </div>
        )}
        {}
        {step === 3 && (
          <div className="question-list">
            <h4>Your Questions</h4>
            {questions.map((q, idx) => (
              <p key={idx} className="question-item">• {q}</p>
            ))}
          </div>
        )}



        {}
        {current.duration > 0 && (
          <>
            <div className="pomodoro-timer">
              <span className="time">
                {minutes}:{seconds}
              </span>
            </div>

            <div className="pomodoro-controls">
              {!isRunning && (
                <button className="cta" onClick={() => setIsRunning(true)}>Start</button>
              )}
              {isRunning && (
                <button
                  className="cta"
                  style={{ backgroundColor: "#FFC857" }}
                  onClick={() => setIsRunning(false)}
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
          </>
        )}

        {}
        {(current.duration === 0 || timeLeft === 0) && step < SQ3R_STEPS.length - 1 && (
          <button className="cta" style={{ marginTop: "30px" }} onClick={() => setStep(step + 1)}>
            Next Step →
          </button>
        )}

        {}
        {step === SQ3R_STEPS.length - 1 && (
          <button className="cta end-btn" style={{ marginTop: "30px" }}>
            Complete Technique ✔
          </button>
        )}
      </div>
    </StudySessionLayout>
  );
};

export default SQ3RTechnique;

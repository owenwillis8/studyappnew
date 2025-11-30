import React, { useState } from "react";
import StudySessionLayout from "../components/StudySessionsTemplate";
import "../Pages/Pomodoro.css";

const MINDMAP_STEPS = [
  {
    title: "Step 1 — Central Idea",
    instructions: "Write your main topic or concept.",
    prompt: "What is your central topic?",
  },
  {
    title: "Step 2 — Major Branches",
    instructions: "Identify 3–6 major subtopics that branch from your main idea.",
    prompt: "List subtopics (separate with commas or new lines)",
  },
  {
    title: "Step 3 — Details & Connections",
    instructions: "Add examples, notes, and connections for deeper understanding.",
    prompt: "Write details that relate to the subtopics.",
  },
];

const MindMap: React.FC = () => {
  const [step, setStep] = useState(0);

  const [centralIdea, setCentralIdea] = useState("");
  const [branchesText, setBranchesText] = useState("");
  const [detailsText, setDetailsText] = useState("");

  const [showGraphic, setShowGraphic] = useState(false);

  const current = MINDMAP_STEPS[step];

  const handleNext = () => {
    if (step < MINDMAP_STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleComplete = () => {
    setShowGraphic(true);
  };

  const branches = branchesText
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <StudySessionLayout title="Mind Mapping" durationMinutes={0}>
      <div className="feynman-container">
        {}
        {!showGraphic && (
          <>
            <h3 className="feynman-step-title">{current.title}</h3>
            <p className="feynman-instructions">{current.instructions}</p>

            <textarea
              className="mindmap-textarea"
              placeholder={current.prompt}
              value={
                step === 0
                  ? centralIdea
                  : step === 1
                  ? branchesText
                  : detailsText
              }
              onChange={(e) => {
                const value = e.target.value;
                if (step === 0) setCentralIdea(value);
                else if (step === 1) setBranchesText(value);
                else setDetailsText(value);
              }}
            />

            {step < MINDMAP_STEPS.length - 1 ? (
              <button className="cta" onClick={handleNext}>
                Next Step →
              </button>
            ) : (
              <button
                className="cta end-btn"
                style={{ marginTop: "24px" }}
                onClick={handleComplete}
              >
                Complete Mind Map ✔
              </button>
            )}
          </>
        )}

        {}
        {showGraphic && (
          <div className="mindmap-graphic-wrapper">
            <h3 className="feynman-step-title">Your Mind Map</h3>
            <p className="feynman-instructions">
              Review your connections and use this map for deeper study.
            </p>

            {}
            <div className="mindmap-graphic">
              <div className="mindmap-node central-node">
                <span>{centralIdea || "Central Idea"}</span>
              </div>

              <div className="mindmap-branches">
                {branches.map((branch, index) => (
                  <div key={index} className="mindmap-node branch-node">
                    <span>{branch}</span>
                  </div>
                ))}
              </div>

              <div className="mindmap-details">
                <h4>Details & Connections</h4>
                <p>{detailsText || "No details provided."}</p>
              </div>
            </div>

            {}
            <div className="mindmap-notes">
              <h3>Your Notes</h3>

              <ul>
                <li>
                  <strong>Central Idea:</strong> {centralIdea || "None"}
                </li>

                <li>
                  <strong>Subtopics:</strong>
                  <ul className="nested-list">
                    {branches.length > 0 ? (
                      branches.map((b, idx) => <li key={idx}>{b}</li>)
                    ) : (
                      <li>None</li>
                    )}
                  </ul>
                </li>

                <li>
                  <strong>Details:</strong>
                  <p>{detailsText || "None"}</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </StudySessionLayout>
  );
};

export default MindMap;



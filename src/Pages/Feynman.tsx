import React, { useState } from "react";
import StudySessionLayout from "../components/StudySessionsTemplate";
import SessionFeedback from "../components/SessionFeedback";

const Feynman: React.FC = () => {
  const [explanation1, setExplanation1] = useState("");
  const [explanation2, setExplanation2] = useState("");
  const [stage, setStage] = useState<
    "study" | "explain1" | "review" | "explain2" | "done"
  >("study");

  const [showFeedback, setShowFeedback] = useState(false);

  const handleNext = () => {
    if (stage === "study") setStage("explain1");
    else if (stage === "explain1") setStage("review");
    else if (stage === "review") setStage("explain2");
    else if (stage === "explain2") {
      setStage("done");
      setShowFeedback(true);
    }
  };

  const handleFeedbackSubmit = async (answers: any) => {
    console.log("Session Feedback:", answers);
    setShowFeedback(false);
  };

  return (
    <StudySessionLayout title="Feynman Technique" durationMinutes={25}>
      {stage === "study" && (
        <div className="feynman-section">
          <h3>Step 1 — Study (25 minutes)</h3>
          <p>Begin reviewing your material. When your timer completes, press next.</p>
          <button className="cta" onClick={handleNext}>
            Start Explaining →
          </button>
        </div>
      )}

      {stage === "explain1" && (
        <div className="feynman-section">
          <h3>Step 2 — Explain the Topic</h3>
          <textarea
            placeholder="Explain the concept as if teaching a child..."
            value={explanation1}
            onChange={(e) => setExplanation1(e.target.value)}
          />
          <button className="cta" onClick={handleNext}>
            Continue →
          </button>
        </div>
      )}

      {stage === "review" && (
        <div className="feynman-section">
          <h3>Step 3 — Review What You Missed (25 minutes)</h3>
          <p>Study the parts you struggled to explain.</p>
          <button className="cta" onClick={handleNext}>
            Explain Again →
          </button>
        </div>
      )}

      {stage === "explain2" && (
        <div className="feynman-section">
          <h3>Step 4 — Final Explanation</h3>
          <textarea
            placeholder="Explain the topic again..."
            value={explanation2}
            onChange={(e) => setExplanation2(e.target.value)}
          />
          <button className="cta" onClick={handleNext}>
            Finish Session →
          </button>
        </div>
      )}

      {showFeedback && <SessionFeedback onSubmit={handleFeedbackSubmit} />}
    </StudySessionLayout>
  );
};

export default Feynman;

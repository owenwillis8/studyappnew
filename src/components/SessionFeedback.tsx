import React, { useState } from "react";
import "../components/SessionFeedback.css";
interface FeedbackProps {
  onSubmit: (answers: {
    focus_quality: string;
    satisfaction: string;
    distraction_level: string;
  }) => void;
}

const options = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const SessionFeedback: React.FC<FeedbackProps> = ({ onSubmit }) => {
  const [responses, setResponses] = useState({
    focus_quality: "...",
    satisfaction: "...",
    distraction_level: "...",
  });

  const handleChange = (field: string, value: string) => {
    setResponses((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (Object.values(responses).some((v) => v === "")) {
      return alert("Please answer all questions.");
    }
    onSubmit(responses);
  };

  return (
    <div className="feedback-modal">
      <div className="feedback-card">
        <h3>Session Reflection</h3>

        <div className="feedback-question">
          <p>I maintained strong focus throughout the session.</p>
          <select
            onChange={(e) =>
              handleChange("focus_quality", e.target.value)
            }
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="feedback-question">
          <p>I feel satisfied with what I accomplished.</p>
          <select
            onChange={(e) =>
              handleChange("satisfaction", e.target.value)
            }
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="feedback-question">
          <p>I was easily distracted during this session.</p>
          <select
            onChange={(e) =>
              handleChange("distraction_level", e.target.value)
            }
          >
            <option value="">Select...</option>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit} className="feedback-submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SessionFeedback;


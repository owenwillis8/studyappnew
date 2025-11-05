import React from "react";
import "../Pages/features.css";
import { Link } from "react-router-dom";
interface StudyMethod {
  name: string;
  description: string;
}

const studyMethods: StudyMethod[] = [
  {
    name: "Pomodoro Technique",
    description:
      "Work in focused 25 minute intervals followed by short breaks to maintain energy and concentration.",
  }
];

const Methods: React.FC = () => {
  return (
    <div className="methods-page">
      <h2>Study Methods</h2>
      <p className="methods-subtitle">
        Choose a method that fits your workflow and mindset.
      </p>
      <div className="methods-grid">
        {studyMethods.map((method) => (
          <div key={method.name} className="method-card">
            <h3>{method.name}</h3>
            <p>{method.description}</p>
            <Link to="/Pomodoro">
            <button className="method-btn">Try This Method</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Methods;

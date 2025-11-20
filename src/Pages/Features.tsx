import React from "react";
import "../Pages/features.css";
import { Link } from "react-router-dom";

interface StudyMethod {
  name: string;
  description: string;
  route: string;
}

const studyMethods: StudyMethod[] = [
  {
    name: "Pomodoro Technique",
    description:
      "Work in focused 25-minute intervals followed by short breaks to maintain energy and concentration.",
    route: "/Pomodoro",
  },
  {
    name: "Feynman Technique",
    description:
      "Deepen your understanding by explaining the concept in simple terms, identifying gaps, and refining your explanation.",
    route: "/Feynman",
  },
  {
    name: "Mind Mapping",
    description:
      "Organize information visually using diagrams that branch out from a central idea to strengthen comprehension and recall.",
    route: "/MindMap",
  },
  {
    name: "SQ3R Method",
    description:
      "Improve reading retention by following the Survey, Question, Read, Recite, and Review framework.",
    route: "/SQ3R",
  },
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
            <Link to={method.route}>
              <button className="method-btn">Try This Method</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Methods;




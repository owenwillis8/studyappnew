import React from "react";
import "../Pages/About.css";

const About: React.FC = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About FlowState</h1>

      <p className="about-tagline">
        A focused space built to help students find clarity, consistency, and
        control in their study sessions.
      </p>

      <div className="about-section">
        <h2>The Mission</h2>
        <p>
          FlowState exists to make studying feel intentional and achievable.
          It combines proven learning techniques with a calming, immersive 
          environment designed to reduce distractions and boost deep work.
        </p>
      </div>

      <div className="about-divider"></div>

      <div className="about-section">
        <h2>What FlowState Offers</h2>
        <ul>
          <li>✔ Guided learning systems like Pomodoro, Feynman, and more</li>
          <li>✔ Built-in focus tools, including ambient rain audio</li>
          <li>✔ Reflective session logs to track progress and growth</li>
          <li>✔ Personalized study experiences through structured methods</li>
        </ul>
      </div>
      </div>
  );
};

export default About;

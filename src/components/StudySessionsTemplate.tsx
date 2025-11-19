import React, { useState } from "react";
import SessionFeedback from "./SessionFeedback";
import { supabase } from "../supabaseClient";
import "../Pages/Pomodoro.css";

interface Props {
  title: string;
  children: React.ReactNode;
  durationMinutes: number;
}

const StudySessionLayout: React.FC<Props> = ({
  title,
  children,
  durationMinutes,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSessionEnd = () => {
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = async (answers: any) => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) return;

    await supabase.from("sessions").insert({
      user_id: data.user.id,
      duration_minutes: durationMinutes,
      ...answers,
      session_type: title,
    });

    setShowFeedback(false);
    alert("Session saved successfully!");
  };

  return (
    <div className="pomodoro-page">
      <h2>{title}</h2>

      <div className="session-content">
        {children}

        <button onClick={handleSessionEnd} className="cta end-btn">
          End Session
        </button>
      </div>

      {showFeedback && <SessionFeedback onSubmit={handleFeedbackSubmit} />}
    </div>
  );
};

export default StudySessionLayout;

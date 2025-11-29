import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import SessionFeedback from "./SessionFeedback";
import { supabase } from "../supabaseClient";
import rainSound from "../assets/rain.mp3";
import "../Pages/Pomodoro.css";

export interface StudySessionHandle {
  openFeedback: () => void;
}

interface Props {
  title: string;
  children: React.ReactNode;
  durationMinutes: number;
}

const StudySessionLayout = forwardRef<StudySessionHandle, Props>(
  ({ title, children, durationMinutes }, ref) => {
    const [showFeedback, setShowFeedback] = useState(false);

    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(0.4);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setVolume(v);
      if (audioRef.current) audioRef.current.volume = v;
    };

    
    useImperativeHandle(ref, () => ({
      openFeedback() {
        setShowFeedback(true);
      },
    }));

    
    const handleSessionEnd = () => {
      setShowFeedback(true);
    };

    
    const handleFeedbackSubmit = async (answers: {
      focus_quality: string;
      satisfaction: string;
      distraction_level: string;
    }) => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) return;

      await supabase.from("user_studysessions").insert({
        user_id: data.user.id,
        duration_minutes: durationMinutes,
        session_type: title,
        ...answers, 
      });

      setShowFeedback(false);
      alert("Session saved successfully!");
    };

    return (
      <div className="pomodoro-page study-session-layout">
        {}
        <audio ref={audioRef} src={rainSound} loop autoPlay />

        {}
        <div className="volume-slider-container">
          <label className="volume-label">Rain Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>

        {}
        <button
          onClick={handleSessionEnd}
          className="cta end-btn"
          style={{
            position: "absolute",
            top: "84px",
            left: "20px",
            background:
              "linear-gradient(135deg, rgba(150,80,255,1), rgba(80,130,255,1))",
            color: "white",
          }}
        >
          End Session
        </button>

        {}
        <h2 style={{ marginTop: "80px" }}>{title}</h2>

        {}
        <div className="session-content">{children}</div>

        {}
        {showFeedback && (
          <SessionFeedback onSubmit={handleFeedbackSubmit} />
        )}
      </div>
    );
  }
);

export default StudySessionLayout;


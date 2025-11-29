import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../Pages/AccountPage.css";

interface StudySessionRow {
  id: string;
  created_at: string;
  session_type: string | null;
  duration_minutes: number | null;
  focus_quality?: string;
  satisfaction?: string;
  distraction_level?: string;
}

const AccountPage: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<StudySessionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const loadSessions = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("user_studysessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Load error:", error);
      } else {
        setSessions(data as StudySessionRow[]);
      }

      setLoading(false);
    };

    loadSessions();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>Your Account</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>

        <div className="sessions-card">
          <h3>Your Study Sessions</h3>

          {loading ? (
            <p>Loading...</p>
          ) : sessions.length === 0 ? (
            <p>No study sessions logged yet.</p>
          ) : (
            <ul className="session-list">
              {sessions.map((s) => (
                <li key={s.id} className="session-item">
                  <div className="session-header">
                    <span className="session-type">
                      {s.session_type ?? "Study Session"}
                    </span>
                    <span className="session-date">
                      {new Date(s.created_at).toLocaleString()}
                    </span>
                  </div>

                  <p className="session-duration">
                    Duration: {s.duration_minutes ?? 0} min
                  </p>

                  <div className="session-reflection">
                    <h4>Reflection</h4>
                    <ul>
                      <li>
                        <strong>Focus:</strong>{" "}
                        {s.focus_quality || "—"}
                      </li>
                      <li>
                        <strong>Satisfaction:</strong>{" "}
                        {s.satisfaction || "—"}
                      </li>
                      <li>
                        <strong>Distraction:</strong>{" "}
                        {s.distraction_level || "—"}
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;






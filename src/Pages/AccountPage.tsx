import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../Pages/AccountPage.css";

interface AccountPageProps {
  user: any | null;
}

const AccountPage: React.FC<AccountPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const loadData = async () => {
      const { data: sessionData } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setSessions(sessionData || []);
    };

    loadData();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-container">
        <h2>Your Account</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>

        <div className="sessions-list">
          <h3>Your Study Sessions</h3>
          {sessions.length > 0 ? (
            <ul>
              {sessions.map((s) => (
                <li key={s.id}>
                  {new Date(s.created_at).toLocaleString()} —{" "}
                  {s.duration_minutes} min
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-sessions">No study sessions logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;


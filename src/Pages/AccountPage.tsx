import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./account.css";

interface AccountPageProps {
  user: any | null;
}

const AccountPage: React.FC<AccountPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const loadData = async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      if (profile) setUsername(profile.username || "");

      const { data: sessionData } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setSessions(sessionData || []);
    };

    loadData();
  }, [user, navigate]);

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) return;
    const { error } = await supabase
      .from("profiles")
      .update({ username: newUsername })
      .eq("id", user.id);
    if (error) {
      console.error(error);
      return;
    }
    setUsername(newUsername);
    setNewUsername("");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Account</h2>
      <p><strong>Email:</strong> {user.email}</p>

      {username ? (
        <p><strong>Username:</strong> {username}</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{ marginRight: "0.5rem", padding: "0.3rem" }}
          />
          <button onClick={handleSaveUsername}>Save Username</button>
        </div>
      )}

      <button
        onClick={handleSignOut}
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          marginTop: "1.5rem",
        }}
      >
        Sign Out
      </button>

      <h3 style={{ marginTop: "2rem" }}>Your Study Sessions</h3>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((s) => (
            <li key={s.id}>
              {new Date(s.created_at).toLocaleString()} — {s.duration_minutes} min
            </li>
          ))}
        </ul>
      ) : (
        <p>No study sessions logged yet.</p>
      )}
    </div>
  );
};

export default AccountPage;

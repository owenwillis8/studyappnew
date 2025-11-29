import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Features from "./Features";
import AuthPage from "./AuthPage";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";
import "../Pages/homepage.css";

import Pomodoro from "../Pages/Pomodoro.tsx";
import Feynman from "../Pages/Feynman.tsx";
import SQ3RTechnique from "../Pages/SQ3RTechnique";
//import MindMap from "../Pages/MindMap";

import AccountPage from "../Pages/AccountPage";

const LandingPage: React.FC = () => (
  <section className="hero">
    <h2>Find Your Flow</h2>
    <p>Guided study sessions that help you stay focused and productive.</p>
    <Link to="/account">
      <button className="cta">Get Started</button>
    </Link>
  </section>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar user={user} />

      <Routes>
        {}
        <Route path="/" element={<LandingPage />} />

        {}
        <Route path="/methods" element={<Features />} />

        {}
        <Route path="/auth" element={<AuthPage />} />

        {}
        <Route path="/account" element={<AccountPage user={user} />} />

        {}
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/feynman" element={<Feynman />} />
        <Route path="/SQ3RTechnique" element={<SQ3RTechnique />} />
      </Routes>
    </>
  );
};

export default App;


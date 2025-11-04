import React, { useEffect, useState } from "react";
import { Routes, Route, Link} from "react-router-dom";
import Navbar from "../components/navbar";
import Features from "./Features";
import AuthPage from "./AuthPage";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

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
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/methods" element={<Features />} />
        <Route path="/account" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;

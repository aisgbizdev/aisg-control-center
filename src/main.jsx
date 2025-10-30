import "./index.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ===================================
// KONFIGURASI BACKEND
// ===================================
const API_URL = import.meta.env.VITE_API_URL;

// ===================================
// NAVBAR COMPONENT
// ===================================
function Navbar() {
  return (
    <div className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 text-gray-100">
        <Link to="/" className="text-xl font-bold tracking-wide text-blue-400">
          AiSG Control Center
        </Link>
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-blue-300 transition">Dashboard</Link>
          <Link to="/audit" className="hover:text-blue-300 transition">Audit</Link>
          <Link to="/coaching" className="hover:text-blue-300 transition">Coaching</Link>
        </div>
      </div>
    </div>
  );
}

// ===================================
// DASHBOARD PAGE
// ===================================
function Dashboard() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function checkServer() {
      try {
        const res = await fetch(`${API_URL}/`);
        if (res.ok) setStatus("✅ Backend Online");
        else setStatus("⚠️ Responded but not OK");
      } catch {
        setStatus("❌ Backend Offline");
      }
    }
    checkServer();
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col justify-center items-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-10 bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-800 max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-400">AiSG PRO Dashboard</h1>
        <p className="mb-6 text-gray-300">
          Backend Status: <span className="font-mono text-white">{status}</span>
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/audit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg w-64 text-center transition"
          >
            📊 View Audit Data
          </Link>
          <Link
            to="/coaching"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg w-64 text-center transition"
          >
            🎯 View Coaching Data
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ===================================
// AUDIT VIEWER PAGE
// ===================================
function AuditViewer() {
  const [audits, setAudits] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/audit`)
      .then((res) => res.json())
      .then((data) => setAudits(data))
      .catch((err) => console.error("Error fetching audits:", err));
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-24 px-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Audit Records
      </h1>
      {audits.length === 0 ? (
        <p className="text-center text-gray-400">No audit data found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {audits.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl p-5 shadow-md"
            >
              <p><strong>Name:</strong> {a.name}</p>
              <p><strong>Score:</strong> {a.score}</p>
              <p><strong>Date:</strong> {a.date}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================================
// COACHING VIEWER PAGE
// ===================================
function CoachingViewer() {
  const [coachings, setCoachings] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/coaching`)
      .then((res) => res.json())
      .then((data) => setCoachings(data))
      .catch((err) => console.error("Error fetching coachings:", err));
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-24 px-8">
      <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">
        Coaching Records
      </h1>
      {coachings.length === 0 ? (
        <p className="text-center text-gray-400">No coaching data found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {coachings.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl p-5 shadow-md"
            >
              <p><strong>Name:</strong> {c.name}</p>
              <p><strong>Feedback:</strong> {c.feedback}</p>
              <p><strong>Date:</strong> {c.date}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================================
// APP WRAPPER DENGAN TRANSITION ROUTE
// ===================================
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/audit" element={<AuditViewer />} />
          <Route path="/coaching" element={<CoachingViewer />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// ===================================
// APP ENTRY POINT
// ===================================
function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

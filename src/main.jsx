import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Konfigurasi URL backend (diambil dari file .env)
const API_URL = import.meta.env.VITE_API_URL;

// ===================== DASHBOARD =====================
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
    <div className="bg-gray-900 text-white min-h-screen p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">AiSG Control Center</h1>
      <p className="mb-6 text-lg">Backend Status: <span className="font-mono">{status}</span></p>
      <div className="flex flex-col items-center gap-4">
        <Link to="/audit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg w-64 text-center">📊 View Audit Data</Link>
        <Link to="/coaching" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg w-64 text-center">🎯 View Coaching Data</Link>
      </div>
    </div>
  );
}

// ===================== AUDIT VIEWER =====================
function AuditViewer() {
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/audit`)
      .then(res => res.json())
      .then(data => setAudits(data))
      .catch(err => console.error("Error fetching audits:", err));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <Link to="/" className="text-blue-400 underline">← Back to Dashboard</Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Audit Records</h1>
      {audits.length === 0 ? (
        <p className="text-center text-gray-400">No audit data found.</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {audits.map((a, i) => (
            <li key={i} className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <p><strong>Name:</strong> {a.name}</p>
              <p><strong>Score:</strong> {a.score}</p>
              <p><strong>Date:</strong> {a.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ===================== COACHING VIEWER =====================
function CoachingViewer() {
  const [coachings, setCoachings] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/coaching`)
      .then(res => res.json())
      .then(data => setCoachings(data))
      .catch(err => console.error("Error fetching coachings:", err));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <Link to="/" className="text-blue-400 underline">← Back to Dashboard</Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Coaching Records</h1>
      {coachings.length === 0 ? (
        <p className="text-center text-gray-400">No coaching data found.</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {coachings.map((c, i) => (
            <li key={i} className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <p><strong>Name:</strong> {c.name}</p>
              <p><strong>Feedback:</strong> {c.feedback}</p>
              <p><strong>Date:</strong> {c.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ===================== APP ROUTES =====================
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/audit" element={<AuditViewer />} />
        <Route path="/coaching" element={<CoachingViewer />} />
      </Routes>
    </Router>
  );
}

// ===================== RENDER APP =====================
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

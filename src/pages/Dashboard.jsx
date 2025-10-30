import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [status, setStatus] = useState("Checking...");
  const [data, setData] = useState({ audits: 0, coachings: 0 });

  useEffect(() => {
    async function checkServer() {
      try {
        const res = await fetch(`${API_URL}/`);
        if (res.ok) setStatus("✅ Online");
        else setStatus("⚠️ Responded but not OK");
      } catch {
        setStatus("❌ Offline");
      }
    }
    checkServer();
  }, []);

  return (
    <div className="p-10 text-center text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">AiSG Control Center</h1>
      <p className="text-lg mb-6">Backend Status: <span className="font-mono">{status}</span></p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Total Audits</h2>
          <p className="text-2xl mt-2">{data.audits}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Coaching Records</h2>
          <p className="text-2xl mt-2">{data.coachings}</p>
        </div>
      </div>
    </div>
  );
}

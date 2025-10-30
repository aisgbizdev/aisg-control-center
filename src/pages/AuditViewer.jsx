import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AuditViewer() {
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/audit`)
      .then(res => res.json())
      .then(data => setAudits(data))
      .catch(err => console.error("Error fetching audits:", err));
  }, []);

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Audit Records</h1>
      <ul className="space-y-2">
        {audits.map((a, i) => (
          <li key={i} className="bg-gray-800 p-4 rounded-xl">
            <p><strong>Name:</strong> {a.name}</p>
            <p><strong>Score:</strong> {a.score}</p>
            <p><strong>Date:</strong> {a.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function CoachingViewer() {
  const [coachings, setCoachings] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/coaching`)
      .then(res => res.json())
      .then(data => setCoachings(data))
      .catch(err => console.error("Error fetching coachings:", err));
  }, []);

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Coaching Records</h1>
      <ul className="space-y-2">
        {coachings.map((c, i) => (
          <li key={i} className="bg-gray-800 p-4 rounded-xl">
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Feedback:</strong> {c.feedback}</p>
            <p><strong>Date:</strong> {c.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const API_URL = import.meta.env.VITE_API_URL;

async function testConnection() {
  try {
    const res = await fetch(`${API_URL}/`);
    if (res.ok) {
      console.log("✅ Backend connected:", API_URL);
    } else {
      console.error("❌ Backend responded but not OK:", res.status);
    }
  } catch (err) {
    console.error("❌ Cannot connect to backend:", err);
  }
}

testConnection();

import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>🚀 AiSG Control Center</h1>
      <p>Frontend aktif dan siap terkoneksi ke backend</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

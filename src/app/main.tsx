import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../styles/globals.css';

// 🔧 Disable React.StrictMode to prevent auth lock timeout warnings
// StrictMode intentionally double-mounts components in development, which causes
// the Supabase auth lock warning: "lock:eras-auth-token was not released within 5000ms"
// This is a harmless development-only warning, but disabling StrictMode eliminates it.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
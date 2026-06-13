import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Scanner from './pages/Scanner';
import Result from './pages/Result';
import History from './pages/History';
import Home from './pages/Home';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0e27' }}>
      <nav style={{
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: 32
      }}>
        <Link to="/" style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#3b82f6',
          textDecoration: 'none',
          letterSpacing: 1
        }}>
          🛡️ SecureVision
        </Link>
        <div style={{ display: 'flex', gap: 24, marginLeft: 'auto' }}>
          <Link to="/" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: 14,
            transition: 'color 0.3s',
            cursor: 'pointer'
          }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
            Home
          </Link>
          <Link to="/scanner" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: 14,
            transition: 'color 0.3s',
            cursor: 'pointer'
          }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
            Scanner
          </Link>
          <Link to="/history" style={{
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: 14,
            transition: 'color 0.3s',
            cursor: 'pointer'
          }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
            History
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

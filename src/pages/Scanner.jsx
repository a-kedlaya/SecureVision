import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Scanner() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const normalizeUrl = (u) => {
    let candidate = u.trim();
    if (!candidate) return '';
    if (!/^https?:\/\//i.test(candidate)) {
      candidate = 'http://' + candidate;
    }
    return candidate;
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normalized = normalizeUrl(url);
    try {
      new URL(normalized);
    } catch {
      setError('Invalid URL format');
      setLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized }),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = (body && body.message) || `Scan failed (${res.status})`;
        setError(msg);
        setLoading(false);
        return;
      }

      if (!body) {
        setError('Empty response from server');
        setLoading(false);
        return;
      }

      localStorage.setItem('lastScanResult', JSON.stringify(body));
      navigate('/result', { state: { result: body } });
    } catch (err) {
      console.error('Scan error:', err);
      setError('Network error. Check backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      padding: '60px 24px',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1e293b 100%)',
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: 600, width: '100%' }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 'bold',
          marginBottom: 12,
          textAlign: 'center',
          color: '#f1f5f9'
        }}>
          Scan Your URL
        </h1>
        <p style={{
          fontSize: 14,
          color: '#94a3b8',
          textAlign: 'center',
          marginBottom: 32
        }}>
          Enter a URL to check for security threats, phishing, and malware
        </p>

        <form onSubmit={handleScan} style={{
          padding: 32,
          background: '#1e293b',
          borderRadius: 12,
          border: '1px solid #334155',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
        }}>
          <label style={{
            display: 'block',
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 8,
            color: '#cbd5e1'
          }}>
            URL to Scan
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#e2e8f0',
              fontSize: 14,
              marginBottom: 16,
              boxSizing: 'border-box',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#334155';
              e.target.style.boxShadow = 'none';
            }}
            disabled={loading}
          />

          {error && (
            <div style={{
              padding: 12,
              background: '#7f1d1d',
              color: '#fecaca',
              borderRadius: 6,
              fontSize: 13,
              marginBottom: 16,
              border: '1px solid #991b1b'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: loading ? '#475569' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }
            }}
          >
            {loading ? '🔍 Scanning...' : '🔍 Scan URL'}
          </button>
        </form>
      </div>
    </div>
  );
}

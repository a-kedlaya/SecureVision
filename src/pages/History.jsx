import React, { useEffect, useState } from 'react';

export default function History() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/scan/history`);
        if (!res.ok) throw new Error('Failed to fetch history');
        const body = await res.json();
        setItems(body.items || []);
      } catch (err) {
        setError(err.message || 'Error loading history');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getRiskColor = (level) => {
    if (level === 'DANGEROUS') return '#ef4444';
    if (level === 'SUSPICIOUS') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div style={{
      minHeight: '80vh',
      padding: '40px 24px',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1e293b 100%)',
      color: '#e2e8f0'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 24,
          textAlign: 'center',
          color: '#f1f5f9'
        }}>
          Scan History
        </h2>

        {error && (
          <div style={{
            padding: 16,
            background: '#7f1d1d',
            color: '#fecaca',
            borderRadius: 8,
            marginBottom: 24,
            border: '1px solid #991b1b'
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading history...</p>
        )}

        {!loading && items.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No scans yet. Start scanning URLs!</p>
        )}

        {!loading && items.length > 0 && (
          <div style={{ display: 'grid', gap: 16 }}>
            {items.map((it) => (
              <div key={it._id} style={{
                padding: 20,
                background: '#1e293b',
                borderRadius: 12,
                border: `1px solid ${getRiskColor(it.riskLevel)}`,
                transition: 'all 0.3s'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${getRiskColor(it.riskLevel)}30`;
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
                  <div>
                    <p style={{
                      fontSize: 13,
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      marginBottom: 8,
                      wordBreak: 'break-all'
                    }}>
                      {it.url}
                    </p>
                    <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
                      {it.reasons && it.reasons.join(' • ')}
                    </p>
                    <p style={{ fontSize: 11, color: '#64748b' }}>
                      {new Date(it.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 100 }}>
                    <div style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: getRiskColor(it.riskLevel),
                      marginBottom: 4
                    }}>
                      {it.score}/100
                    </div>
                    <div style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: getRiskColor(it.riskLevel),
                      background: getRiskColor(it.riskLevel) + '20',
                      padding: '4px 8px',
                      borderRadius: 4,
                      textAlign: 'center'
                    }}>
                      {it.riskLevel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

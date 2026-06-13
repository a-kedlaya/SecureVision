import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result || JSON.parse(localStorage.getItem('lastScanResult') || 'null');

  if (!result) {
    return (
      <div style={{ padding: 24, color: '#e2e8f0' }}>
        <p>No result available.</p>
        <button onClick={() => navigate('/scanner')}>Back to Scanner</button>
      </div>
    );
  }

  const getRiskColor = (level) => {
    if (level === 'DANGEROUS') return '#ef4444';
    if (level === 'SUSPICIOUS') return '#f59e0b';
    return '#10b981';
  };

  const StatCard = ({ label, value, color, icon }) => (
    <div style={{
      padding: 16,
      background: '#0f172a',
      borderRadius: 8,
      border: '1px solid #334155',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </p>
      <p style={{ fontSize: 18, fontWeight: 'bold', color: color }}>
        {value}
      </p>
    </div>
  );

  return (
    <div style={{
      minHeight: '80vh',
      padding: '40px 24px',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1e293b 100%)',
      color: '#e2e8f0'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 24,
          textAlign: 'center',
          color: '#f1f5f9'
        }}>
          Scan Result
        </h2>

        {/* Main Result Card */}
        <div style={{
          padding: 32,
          background: '#1e293b',
          borderRadius: 12,
          border: `2px solid ${getRiskColor(result.riskLevel)}`,
          marginBottom: 24,
          boxShadow: `0 8px 24px ${getRiskColor(result.riskLevel)}20`
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>URL</p>
              <p style={{
                fontSize: 14,
                color: '#cbd5e1',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                background: '#0f172a',
                padding: 8,
                borderRadius: 6
              }}>
                {result.url}
              </p>
            </div>

            <div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Security Score</p>
              <div style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: getRiskColor(result.riskLevel)
              }}>
                {result.score}/100
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
            marginBottom: 24
          }}>
            <div style={{
              padding: 12,
              background: '#0f172a',
              borderRadius: 8,
              border: `1px solid ${getRiskColor(result.riskLevel)}`,
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Risk Level</p>
              <p style={{ fontSize: 14, fontWeight: 'bold', color: getRiskColor(result.riskLevel) }}>
                {result.riskLevel}
              </p>
            </div>

            <div style={{
              padding: 12,
              background: '#0f172a',
              borderRadius: 8,
              border: '1px solid #334155',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Domain Exists</p>
              <p style={{ fontSize: 14, fontWeight: 'bold', color: result.domainExists ? '#10b981' : '#ef4444' }}>
                {result.domainExists ? '✅ Yes' : '❌ No'}
              </p>
            </div>

            <div style={{
              padding: 12,
              background: '#0f172a',
              borderRadius: 8,
              border: '1px solid #334155',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Genuine URL</p>
              <p style={{ fontSize: 14, fontWeight: 'bold', color: result.isGenuine ? '#10b981' : '#ef4444' }}>
                {result.isGenuine ? '✅ Yes' : '❌ Suspicious'}
              </p>
            </div>
          </div>

          <div style={{
            padding: 16,
            background: '#0f172a',
            borderRadius: 8,
            borderLeft: `4px solid ${getRiskColor(result.riskLevel)}`
          }}>
            <p style={{
              fontSize: 13,
              color: '#e2e8f0',
              lineHeight: 1.6
            }}>
              {result.warning}
            </p>
          </div>
        </div>

        {/* Reasons */}
        <div style={{
          padding: 24,
          background: '#1e293b',
          borderRadius: 12,
          border: '1px solid #334155',
          marginBottom: 24
        }}>
          <h3 style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#cbd5e1'
          }}>
            Detection Details
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {result.reasons.map((r, i) => (
              <li key={i} style={{
                padding: 8,
                borderBottom: i < result.reasons.length - 1 ? '1px solid #334155' : 'none',
                color: '#cbd5e1',
                fontSize: 13
              }}>
                • {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Advanced Analysis */}
        {result.meta && (
          <div style={{
            padding: 24,
            background: '#1e293b',
            borderRadius: 12,
            border: '1px solid #334155',
            marginBottom: 24
          }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              🔬 Advanced Analysis
            </h3>

            {/* Domain Check Section */}
            {result.meta.domainCheck && (
              <div style={{ marginBottom: 24 }}>
                <h4 style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#cbd5e1',
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottom: '1px solid #334155'
                }}>
                  🌐 Domain Information
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 12
                }}>
                  <StatCard 
                    label="Status" 
                    value={result.meta.domainCheck.exists ? 'Exists' : 'Not Found'}
                    color={result.meta.domainCheck.exists ? '#10b981' : '#ef4444'}
                    icon={result.meta.domainCheck.exists ? '✅' : '❌'}
                  />
                  <StatCard 
                    label="Method" 
                    value={result.meta.domainCheck.method.replace('dns_', '').toUpperCase()}
                    color="#3b82f6"
                    icon="🔍"
                  />
                  {result.meta.domainCheck.addresses && (
                    <StatCard 
                      label="IPs Resolved" 
                      value={result.meta.domainCheck.addresses.length}
                      color="#8b5cf6"
                      icon="🔗"
                    />
                  )}
                </div>
                {result.meta.domainCheck.addresses && result.meta.domainCheck.addresses.length > 0 && (
                  <div style={{
                    marginTop: 12,
                    padding: 12,
                    background: '#0f172a',
                    borderRadius: 8,
                    border: '1px solid #334155'
                  }}>
                    <p style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, fontWeight: 'bold' }}>
                      Resolved IP Addresses:
                    </p>
                    {result.meta.domainCheck.addresses.map((ip, i) => (
                      <p key={i} style={{
                        fontSize: 12,
                        color: '#cbd5e1',
                        fontFamily: 'monospace',
                        padding: 4,
                        background: '#1e293b',
                        borderRadius: 4,
                        marginBottom: 4
                      }}>
                        {ip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* VirusTotal Section */}
            {result.meta.virustotal && (
              <div>
                <h4 style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#cbd5e1',
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottom: '1px solid #334155'
                }}>
                  🦠 VirusTotal Reputation
                </h4>

                {/* URL Reputation */}
                {result.meta.virustotal.url && (
                  <div style={{ marginBottom: 20 }}>
                    <p style={{
                      fontSize: 12,
                      color: '#94a3b8',
                      fontWeight: 'bold',
                      marginBottom: 8,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5
                    }}>
                      URL Analysis
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: 12
                    }}>
                      <StatCard 
                        label="Malicious" 
                        value={result.meta.virustotal.url.malicious}
                        color={result.meta.virustotal.url.malicious > 0 ? '#ef4444' : '#10b981'}
                        icon={result.meta.virustotal.url.malicious > 0 ? '⚠️' : '✅'}
                      />
                      <StatCard 
                        label="Suspicious" 
                        value={result.meta.virustotal.url.suspicious}
                        color={result.meta.virustotal.url.suspicious > 0 ? '#f59e0b' : '#10b981'}
                        icon={result.meta.virustotal.url.suspicious > 0 ? '⚡' : '✅'}
                      />
                      <StatCard 
                        label="Harmless" 
                        value={result.meta.virustotal.url.harmless}
                        color="#10b981"
                        icon="✓"
                      />
                      <StatCard 
                        label="Undetected" 
                        value={result.meta.virustotal.url.undetected}
                        color="#64748b"
                        icon="–"
                      />
                    </div>
                  </div>
                )}

                {/* Domain Reputation */}
                {result.meta.virustotal.domain && (
                  <div style={{ marginBottom: 12 }}>
                    <p style={{
                      fontSize: 12,
                      color: '#94a3b8',
                      fontWeight: 'bold',
                      marginBottom: 8,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5
                    }}>
                      Domain Analysis
                    </p>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: 12
                    }}>
                      <StatCard 
                        label="Malicious" 
                        value={result.meta.virustotal.domain.malicious}
                        color={result.meta.virustotal.domain.malicious > 0 ? '#ef4444' : '#10b981'}
                        icon={result.meta.virustotal.domain.malicious > 0 ? '⚠️' : '✅'}
                      />
                      <StatCard 
                        label="Suspicious" 
                        value={result.meta.virustotal.domain.suspicious}
                        color={result.meta.virustotal.domain.suspicious > 0 ? '#f59e0b' : '#10b981'}
                        icon={result.meta.virustotal.domain.suspicious > 0 ? '⚡' : '✅'}
                      />
                      <StatCard 
                        label="Harmless" 
                        value={result.meta.virustotal.domain.harmless}
                        color="#10b981"
                        icon="✓"
                      />
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                {result.meta.virustotal.timestamp && (
                  <div style={{
                    marginTop: 12,
                    padding: 10,
                    background: '#0f172a',
                    borderRadius: 6,
                    fontSize: 11,
                    color: '#64748b',
                    textAlign: 'center',
                    borderTop: '1px solid #334155'
                  }}>
                    Last scanned: {new Date(result.meta.virustotal.timestamp).toLocaleString()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => navigate('/scanner')}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          ← Scan Another URL
        </button>
      </div>
    </div>
  );
}

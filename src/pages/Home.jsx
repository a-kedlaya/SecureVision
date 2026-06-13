import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: 'Domain Existence Check',
      desc: 'Verifies if a website domain actually exists using DNS lookup',
      icon: '🌐'
    },
    {
      title: 'Malware Detection',
      desc: 'Scans URLs against VirusTotal database for known threats',
      icon: '🦠'
    },
    {
      title: 'Phishing Detection',
      desc: 'Identifies suspicious keywords and phishing patterns in URLs',
      icon: '🎣'
    },
    {
      title: 'HTTPS Analysis',
      desc: 'Checks for secure connections and SSL/TLS certificates',
      icon: '🔒'
    },
    {
      title: 'Auto-Generated Domain Detection',
      desc: 'Finds randomly generated or gibberish domain names',
      icon: '🤖'
    },
    {
      title: 'Shortener Detection',
      desc: 'Identifies URL shortener services that hide real destination',
      icon: '📎'
    }
  ];

  const safetyTips = [
    {
      title: 'Check for HTTPS',
      content: 'Always verify websites use HTTPS (secure connection). Look for the lock icon in your browser address bar.'
    },
    {
      title: 'Verify Domain Authenticity',
      content: 'Check if the domain name matches the organization. Scammers often use similar-looking domains (google.cpm vs google.com).'
    },
    {
      title: 'Avoid Suspicious Keywords',
      content: 'Be wary of URLs containing words like "verify", "login", "update", "secure", "account", "free", "bank", etc. in unusual contexts.'
    },
    {
      title: 'Don\'t Trust Shortened URLs',
      content: 'Shortened URLs (bit.ly, tinyurl) hide the real destination. Always expand them before clicking.'
    },
    {
      title: 'Check Domain Existence',
      content: 'Ensure the domain actually exists. Typosquatting uses real-looking but fake domains to trick users.'
    },
    {
      title: 'Look for Natural Patterns',
      content: 'Real domains usually follow natural naming patterns. Random character combinations are often malicious.'
    }
  ];

  return (
    <div style={{ color: '#e2e8f0', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        padding: '60px 24px',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        textAlign: 'center',
        borderBottom: '1px solid #334155'
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 'bold',
          marginBottom: 12,
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 2
        }}>
          🛡️ SecureVision
        </h1>
        <p style={{
          fontSize: 18,
          color: '#94a3b8',
          marginBottom: 32,
          maxWidth: 600,
          margin: '0 auto 32px'
        }}>
          Advanced URL security scanner that detects malware, phishing, and suspicious domains in real-time.
        </p>
        <Link to="/scanner" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 'bold',
          transition: 'transform 0.3s, boxShadow 0.3s',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
          cursor: 'pointer'
        }} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.4)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
        }}>
          Start Scanning →
        </Link>
      </div>

      {/* Features Section */}
      <div style={{
        padding: '60px 24px',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 12,
          textAlign: 'center',
          color: '#f1f5f9'
        }}>
          How SecureVision Works
        </h2>
        <p style={{
          fontSize: 14,
          color: '#94a3b8',
          textAlign: 'center',
          marginBottom: 40,
          maxWidth: 600,
          margin: '0 auto 40px'
        }}>
          Our multi-layered security analysis provides comprehensive URL protection
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              padding: 24,
              background: '#1e293b',
              borderRadius: 12,
              border: '1px solid #334155',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0f172a';
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.borderColor = '#334155';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 8,
                color: '#f1f5f9'
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: '#cbd5e1',
                lineHeight: 1.6
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips Section */}
      <div style={{
        padding: '60px 24px',
        background: '#1e293b',
        borderTop: '1px solid #334155'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 12,
            textAlign: 'center',
            color: '#f1f5f9'
          }}>
            URL Safety Knowledge
          </h2>
          <p style={{
            fontSize: 14,
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 600,
            margin: '0 auto 40px'
          }}>
            Learn to identify suspicious URLs and stay safe online
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24
          }}>
            {safetyTips.map((tip, i) => (
              <div key={i} style={{
                padding: 20,
                background: '#0f172a',
                borderRadius: 12,
                border: '1px solid #334155',
                borderLeft: '4px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  color: '#60a5fa'
                }}>
                  {tip.title}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: '#cbd5e1',
                  lineHeight: 1.6
                }}>
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '24px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: 12,
        borderTop: '1px solid #334155'
      }}>
        <p>SecureVision © 2026 | Advanced URL Security Scanner</p>
      </div>
    </div>
  );
}
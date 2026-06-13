import React from 'react'

export default function Landing(){
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold">SafeLink Detector</h2>
      <p className="max-w-2xl mx-auto">Protect yourself from phishing and malicious websites. Enter a URL in the scanner to get an instant safety score, risk level, and explanation.</p>
      <div className="flex justify-center">
        <a href="/scan" className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-500">Scan a URL</a>
      </div>
    </div>
  )
}

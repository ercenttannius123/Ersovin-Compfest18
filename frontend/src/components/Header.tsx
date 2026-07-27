import React from 'react'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="app-title">FabriScan</h1>
          <p className="app-subtitle">Fabric Defect Detection System</p>
        </div>
        <div className="header-info">
          <span className="badge">AI-Powered Detection</span>
        </div>
      </div>
    </header>
  )
}

export default Header

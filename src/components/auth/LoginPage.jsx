// src/components/auth/LoginPage.jsx
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Spinner } from "../common/Spinner"

export function LoginPage({ onNavigate }) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDemoAccounts, setShowDemoAccounts] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    setError("")
    const res = await login(email, password)
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  const demoAccounts = [
    { role: "Super Admin", email: "superadmin@certflow.com", password: "super123", plan: "Enterprise", badge: "Full Access" },
    { role: "Admin", email: "admin@certflow.com", password: "admin123", plan: "Enterprise", badge: "Full Management" },
    { role: "Manager", email: "manager@certflow.com", password: "manager123", plan: "Business", badge: "Team Access" },
    { role: "Editor", email: "editor@certflow.com", password: "editor123", plan: "Pro", badge: "Create & Edit" },
    { role: "Viewer", email: "viewer@certflow.com", password: "viewer123", plan: "Basic", badge: "Read Only" },
    { role: "Demo User", email: "demo@certflow.com", password: "demo123", plan: "Free", badge: "Limited" },
    { role: "Enterprise", email: "enterprise@certflow.com", password: "enterprise123", plan: "Enterprise", badge: "Full Features" },
    { role: "Business", email: "business@certflow.com", password: "business123", plan: "Business", badge: "Advanced" }
  ]

  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card" style={{ width: 500 }}>
        <div className="auth-logo">
          <div style={{ width: 36, height: 36, background: "#2563eb", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
            C
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600 }}>CertFlow</span>
        </div>
        
        <div className="auth-title">Welcome back</div>
        <div className="auth-sub">Choose your role and login to access your dashboard</div>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          
          <Button type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "10px" }}>
            {loading ? <><Spinner /> Signing in…</> : "Sign in →"}
          </Button>
        </form>
        
        <div style={{ marginTop: 24 }}>
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              marginBottom: 16
            }}
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          >
            <span style={{ fontWeight: 600, fontSize: 13 }}>🔑 Demo Accounts</span>
            <span>{showDemoAccounts ? "▼" : "▶"}</span>
          </div>
          
          {showDemoAccounts && (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: 8,
              maxHeight: 300,
              overflowY: "auto",
              padding: "4px 0"
            }}>
              {demoAccounts.map(account => (
                <div 
                  key={account.email}
                  onClick={() => fillCredentials(account.email, account.password)}
                  style={{
                    padding: "10px",
                    background: "#f8f7f5",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "all .15s",
                    border: "1px solid #e5e7eb"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "#f8f7f5"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <strong style={{ fontSize: 13 }}>{account.role}</strong>
                    <span style={{ 
                      fontSize: 10, 
                      background: account.plan === "Enterprise" ? "#8b5cf6" : 
                                 account.plan === "Business" ? "#3b82f6" :
                                 account.plan === "Pro" ? "#10b981" :
                                 account.plan === "Basic" ? "#f59e0b" : "#6b7280",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: 4
                    }}>
                      {account.plan}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>{account.email}</div>
                  <div style={{ fontSize: 9, color: "#9ca3af" }}>Password: {account.password}</div>
                  <div style={{ 
                    fontSize: 9, 
                    color: "#2563eb", 
                    marginTop: 4,
                    display: "inline-block",
                    background: "#eff6ff",
                    padding: "2px 6px",
                    borderRadius: 4
                  }}>
                    {account.badge}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#6b7280" }}>
          Don't have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => onNavigate("register")}>
            Sign up
          </span>
        </p>
        
        <p style={{ textAlign: "center", marginTop: 12, fontSize: 13 }}>
          <span style={{ color: "#6b7280", cursor: "pointer" }} onClick={() => onNavigate("landing")}>
            ← Back to home
          </span>
        </p>
      </div>
    </div>
  )
}
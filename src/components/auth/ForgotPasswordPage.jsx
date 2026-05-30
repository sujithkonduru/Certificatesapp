import { useState } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"

export function ForgotPasswordPage({ onNavigate }) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <div style={{ width: 36, height: 36, background: "#2563eb", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
            C
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600 }}>CertFlow</span>
        </div>
        
        <div className="auth-title">Reset password</div>
        
        {!sent ? (
          <>
            <div className="auth-sub">Enter your email and we'll send you a reset link</div>
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button onClick={() => setSent(true)} style={{ width: "100%", justifyContent: "center", padding: "10px" }}>
              Send reset link
            </Button>
          </>
        ) : (
          <div className="alert alert-success">
            ✉️ Check your email! We sent a reset link to {email}
          </div>
        )}
        
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13 }}>
          <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => onNavigate("login")}>
            ← Back to login
          </span>
        </p>
      </div>
    </div>
  )
}
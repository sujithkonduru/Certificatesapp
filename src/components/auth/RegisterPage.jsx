// src/components/auth/RegisterPage.jsx
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Spinner } from "../common/Spinner"

export function RegisterPage({ onNavigate }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    org: "", 
    plan: "Free",
    password: "", 
    confirm: "" 
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const plans = [
    { 
      name: "Free", 
      price: "$0", 
      features: ["50 certificates/month", "2 templates", "Email delivery", "QR verification"],
      popular: false
    },
    { 
      name: "Basic", 
      price: "$19", 
      features: ["100 certificates/month", "5 templates", "Email delivery", "QR verification", "Analytics"],
      popular: false
    },
    { 
      name: "Pro", 
      price: "$49", 
      features: ["500 certificates/month", "Unlimited templates", "Priority delivery", "Analytics", "API access"],
      popular: true
    },
    { 
      name: "Business", 
      price: "$99", 
      features: ["2000 certificates/month", "Unlimited templates", "Team collaboration", "White-label", "Priority support"],
      popular: false
    },
    { 
      name: "Enterprise", 
      price: "Custom", 
      features: ["Unlimited certificates", "Full API access", "24/7 support", "Custom integrations", "SLA guarantee"],
      popular: false
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in required fields")
      return
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    setError("")
    const res = await register(form)
    if (!res.success) setError(res.error)
    setLoading(false)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card" style={{ width: 550 }}>
        <div className="auth-logo">
          <div style={{ width: 36, height: 36, background: "#2563eb", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
            C
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600 }}>CertFlow</span>
        </div>
        
        <div className="auth-title">Create your account</div>
        <div className="auth-sub">Choose a plan that fits your needs</div>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <Input
              label="Full Name *"
              placeholder="John Smith"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Organization"
              placeholder="Acme Corp"
              value={form.org}
              onChange={e => setForm({ ...form, org: e.target.value })}
            />
          </div>
          
          <Input
            label="Email *"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          
          <div className="grid-2">
            <Input
              label="Password *"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
            />
          </div>
          
          <div className="input-wrap">
            <label className="input-label">Select Plan *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 8 }}>
              {plans.map(plan => (
                <div
                  key={plan.name}
                  onClick={() => setForm({ ...form, plan: plan.name })}
                  style={{
                    padding: "12px",
                    border: form.plan === plan.name ? "2px solid #2563eb" : "1px solid #e5e7eb",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: form.plan === plan.name ? "#eff6ff" : "white",
                    position: "relative"
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: "absolute",
                      top: -8,
                      right: 8,
                      background: "#10b981",
                      color: "white",
                      fontSize: 9,
                      padding: "2px 6px",
                      borderRadius: 4
                    }}>
                      Popular
                    </div>
                  )}
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{plan.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#2563eb", marginBottom: 8 }}>
                    {plan.price}
                    {plan.price !== "Custom" && <span style={{ fontSize: 11, color: "#6b7280" }}>/mo</span>}
                  </div>
                  <div style={{ fontSize: 10, color: "#6b7280" }}>
                    {plan.features.slice(0, 2).map(f => (
                      <div key={f}>✓ {f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "10px" }}>
            {loading ? <><Spinner /> Creating account…</> : `Start ${form.plan} Plan →`}
          </Button>
        </form>
        
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#6b7280" }}>
          Already have an account?{" "}
          <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => onNavigate("login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}
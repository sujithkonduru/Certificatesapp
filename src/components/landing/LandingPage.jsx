import { Button } from "../common/Button"

export function LandingPage({ onNavigate }) {
  const features = [
    { icon: "🎨", title: "Template Builder", desc: "Drag-and-drop editor for beautiful certificate templates." },
    { icon: "⚡", title: "Bulk Generation", desc: "Generate thousands of certificates instantly from CSV." },
    { icon: "📧", title: "Auto Email Delivery", desc: "Send certificates automatically with custom email templates." },
    { icon: "🔍", title: "QR Verification", desc: "Each certificate gets a unique QR code for instant verification." },
    { icon: "👥", title: "Team Collaboration", desc: "Invite team members with role-based access controls." },
    { icon: "🔗", title: "API Integration", desc: "Integrate certificate generation into your workflow via REST API." },
  ]

  const pricing = [
    { name: "Free", price: "$0", desc: "Perfect for getting started", features: ["50 certs/month", "2 templates", "Email delivery", "QR verification"], popular: false },
    { name: "Pro", price: "$29", desc: "For growing organizations", features: ["500 certs/month", "Unlimited templates", "Priority delivery", "Team collab", "Analytics", "API access"], popular: true },
    { name: "Enterprise", price: "Custom", desc: "For large scale operations", features: ["Unlimited certs", "White-label", "Dedicated support", "Custom integrations", "SLA guarantee", "Advanced analytics"], popular: false },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <header style={{ borderBottom: "1px solid #e5e7eb", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(255,255,255,.95)", backdropFilter: "blur(8px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "#2563eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>C</div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600 }}>CertFlow</span>
        </div>
        <nav style={{ display: "flex", gap: 32, fontSize: 14, color: "#6b7280" }}>
          {["Features", "Pricing", "FAQ"].map(t => <span key={t} style={{ cursor: "pointer" }}>{t}</span>)}
        </nav>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="outline" onClick={() => onNavigate("login")}>Sign in</Button>
          <Button onClick={() => onNavigate("register")}>Get Started</Button>
        </div>
      </header>

      <section style={{ padding: "80px 40px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", color: "#1e40af", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
          ✨ Trusted by 500+ organizations worldwide
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 58, fontWeight: 600, lineHeight: 1.1, marginBottom: 20, color: "#0f172a" }}>
          Generate certificates <span style={{ color: "#2563eb" }}>at scale</span>
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Create beautiful certificates, automate email delivery, and verify authenticity with QR codes. All in one powerful platform.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 60 }}>
          <Button onClick={() => onNavigate("register")} style={{ padding: "12px 28px", fontSize: 15 }}>
            Start for free →
          </Button>
          <Button variant="outline" onClick={() => onNavigate("login")} style={{ padding: "12px 28px", fontSize: 15 }}>
            See demo
          </Button>
        </div>
        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          {[["10K+", "Certificates"], ["500+", "Organizations"], ["99.9%", "Uptime"]].map(([value, label]) => (
            <div key={label}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#111" }}>{value}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#f8f7f5", padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, textAlign: "center", marginBottom: 12 }}>Everything you need</h2>
          <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 48, fontSize: 15 }}>A complete certificate management solution</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {features.map(feature => (
              <div key={feature.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{feature.icon}</div>
                <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{feature.title}</h3>
                <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, textAlign: "center", marginBottom: 12 }}>Simple, transparent pricing</h2>
          <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 48, fontSize: 15 }}>Start for free, upgrade when you need more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {pricing.map(plan => (
              <div key={plan.name} style={{ background: "#fff", border: `${plan.popular ? "2px solid #2563eb" : "1px solid #e5e7eb"}`, borderRadius: 12, padding: 28, position: "relative" }}>
                {plan.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", padding: "3px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                    Most Popular
                  </div>
                )}
                <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{plan.name}</h3>
                <div style={{ fontSize: 34, fontWeight: 700, margin: "8px 0 4px" }}>
                  {plan.price}
                  {plan.price !== "Custom" && <span style={{ fontSize: 14, fontWeight: 400, color: "#6b7280" }}>/mo</span>}
                </div>
                <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>{plan.desc}</p>
                <ul style={{ listStyle: "none", marginBottom: 20 }}>
                  {plan.features.map(feature => (
                    <li key={feature} style={{ fontSize: 13, padding: "4px 0", color: "#374151" }}>✓ {feature}</li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "primary" : "outline"} onClick={() => onNavigate("register")} style={{ width: "100%" }}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1e40af", padding: "72px 40px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, marginBottom: 12 }}>Ready to streamline your certificates?</h2>
        <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 15 }}>Join thousands of organizations using CertFlow today.</p>
        <Button onClick={() => onNavigate("register")} style={{ background: "#fff", color: "#1e40af", padding: "12px 28px", fontSize: 15 }}>
          Start your free trial →
        </Button>
      </section>

      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#6b7280", fontSize: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, background: "#2563eb", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>C</div>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: "#111" }}>CertFlow</span>
        </div>
        <span>© 2025 CertFlow. All rights reserved.</span>
      </footer>
    </div>
  )
}
import { Button } from "../common/Button"

export function GenerateStep({ onReset }) {
  return (
    <div className="card" style={{ textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, marginBottom: 8 }}>
        Certificates Generated!
      </h3>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        3 certificates have been created and emails are being delivered.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <Button onClick={onReset}>Generate More</Button>
        <Button variant="outline">View Certificates</Button>
      </div>
    </div>
  )
}
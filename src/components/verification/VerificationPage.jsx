import { useState } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { CERTIFICATES } from "../../data/dummyData"

export function VerificationPage() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const verify = () => {
    const cert = CERTIFICATES.find(c => 
      c.id.toLowerCase() === query.toLowerCase() || 
      c.id.toLowerCase() === `cert-${query.toLowerCase()}`
    )
    if (cert) {
      setResult(cert)
      setNotFound(false)
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginBottom: 4 }}>
          Certificate Verification
        </h2>
        <p style={{ color: "#6b7280", fontSize: 13 }}>
          Verify the authenticity of any certificate by entering its ID or scanning a QR code.
        </p>
      </div>
      
      <div className="card" style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 20 }}>
          <label className="input-label">Certificate ID</label>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <Input 
              placeholder="e.g. CERT-001" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && verify()}
              style={{ flex: 1 }}
            />
            <Button onClick={verify}>Verify</Button>
          </div>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
            Try: CERT-001 through CERT-010
          </p>
        </div>
        
        {result && (
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ fontSize: 28 }}>✅</div>
              <div>
                <div style={{ fontWeight: 600, color: "#065f46", fontSize: 15 }}>Certificate Verified</div>
                <div style={{ fontSize: 12, color: "#059669" }}>This certificate is authentic</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["Certificate ID", result.id],
                ["Recipient", result.name],
                ["Course", result.course],
                ["Template", result.template],
                ["Issue Date", result.date],
                ["Status", result.status]
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: "#059669", fontWeight: 500, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#065f46", fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {notFound && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 28 }}>❌</div>
            <div>
              <div style={{ fontWeight: 600, color: "#991b1b" }}>Certificate Not Found</div>
              <div style={{ fontSize: 12, color: "#dc2626" }}>
                No certificate found with ID "{query}". Please check and try again.
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="card" style={{ marginTop: 20 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>📊 Verification Stats</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            ["Total Verifications", "2,847"],
            ["Successful", "2,801"],
            ["Failed", "46"]
          ].map(([label, value]) => (
            <div key={label} style={{ background: "#f8f7f5", borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
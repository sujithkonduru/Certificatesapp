import { useState } from "react"
import { Button } from "../common/Button"
import { Badge } from "../common/Badge"
import { RECIPIENTS } from "../../data/dummyData"

export function RecipientsPage() {
  const [search, setSearch] = useState("")
  
  const filtered = RECIPIENTS.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="section-header">
        <span className="section-title" style={{ fontSize: 20, fontFamily: "'Fraunces', serif" }}>
          Recipients
        </span>
        <Button>+ Add Recipient</Button>
      </div>
      
      <div className="card">
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div className="search-bar">
            <span style={{ color: "#9ca3af" }}>🔍</span>
            <input 
              placeholder="Search recipients…" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <span style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280", alignSelf: "center" }}>
            {filtered.length} recipients
          </span>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Organization</th>
              <th>Certificates</th>
              <th>Last Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(recipient => (
              <tr key={recipient.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                      {recipient.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{recipient.name}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{recipient.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: "#6b7280" }}>{recipient.org}</td>
                <td><Badge variant="blue">{recipient.certs} cert{recipient.certs !== 1 ? "s" : ""}</Badge></td>
                <td style={{ fontSize: 12, color: "#6b7280" }}>{recipient.lastCert}</td>
                <td><Button variant="outline" size="sm">View History</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
import { useState } from "react"
import { Badge } from "../common/Badge"
import { Button } from "../common/Button"
import { EMAIL_LOGS } from "../../data/dummyData"

export function EmailLogsPage() {
  const [filter, setFilter] = useState("all")
  
  const filtered = EMAIL_LOGS.filter(log => filter === "all" || log.status === filter)
  const filters = [["all", "All"], ["delivered", "Delivered"], ["pending", "Pending"], ["bounced", "Bounced"]]

  const getBadgeVariant = (status) => {
    if (status === "delivered") return "green"
    if (status === "pending") return "orange"
    return "red"
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title" style={{ fontSize: 20, fontFamily: "'Fraunces', serif" }}>
          Email Logs
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map(([value, label]) => (
            <span 
              key={value} 
              className={`chip ${filter === value ? "selected" : ""}`} 
              onClick={() => setFilter(value)}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>To</th>
              <th>Subject</th>
              <th>Cert ID</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id}>
                <td><code style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4 }}>{log.id}</code></td>
                <td style={{ fontSize: 13 }}>{log.to}</td>
                <td style={{ color: "#374151", fontSize: 13, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {log.subject}
                </td>
                <td><code style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4 }}>{log.certId}</code></td>
                <td style={{ fontSize: 12, color: "#6b7280" }}>{log.time}</td>
                <td><Badge variant={getBadgeVariant(log.status)}>{log.status}</Badge></td>
                <td>
                  {log.status !== "delivered" && <Button variant="outline" size="sm">Retry</Button>}
                  {log.status === "delivered" && <Button variant="outline" size="sm">Resend</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-state">No email logs</div>}
      </div>
    </div>
  )
}
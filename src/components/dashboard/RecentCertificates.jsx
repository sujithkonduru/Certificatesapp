import { Button } from "../common/Button"
import { Badge } from "../common/Badge"

export function RecentCertificates({ certificates }) {
  const getBadgeVariant = (status) => {
    if (status === "delivered") return "green"
    if (status === "pending") return "orange"
    return "red"
  }

  return (
    <div className="card">
      <div className="section-header">
        <span className="section-title">Recent Certificates</span>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div>
        {certificates.map(cert => (
          <div key={cert.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f3f2ef" }}>
            <div style={{ width: 36, height: 36, background: "#eff6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
              🏆
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {cert.name}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {cert.course}
              </div>
            </div>
            <Badge variant={getBadgeVariant(cert.status)}>{cert.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
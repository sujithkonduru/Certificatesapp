import { Badge } from "../common/Badge"
import { Button } from "../common/Button"

export function CertificateTable({ certificates, onViewCertificate }) {
  const getBadgeVariant = (status) => {
    if (status === "delivered") return "green"
    if (status === "pending") return "orange"
    return "red"
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Recipient</th>
          <th>Course</th>
          <th>Template</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map(cert => (
          <tr key={cert.id}>
            <td><code style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4 }}>{cert.id}</code></td>
            <td>
              <div style={{ fontWeight: 500 }}>{cert.name}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{cert.email}</div>
            </td>
            <td style={{ color: "#374151" }}>{cert.course}</td>
            <td style={{ color: "#6b7280", fontSize: 12 }}>{cert.template}</td>
            <td style={{ color: "#6b7280", fontSize: 12 }}>{cert.date}</td>
            <td><Badge variant={getBadgeVariant(cert.status)}>{cert.status}</Badge></td>
            <td>
              <div style={{ display: "flex", gap: 6 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewCertificate(cert)}
                >
                  👁️ View
                </Button>
                <Button variant="outline" size="sm">Resend</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
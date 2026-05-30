import { Button } from "../common/Button"
import { Badge } from "../common/Badge"

export function BillingPage({ user }) {
  const invoices = [
    { id: "INV-005", date: "2025-05-01", amount: "$29.00", status: "paid" },
    { id: "INV-004", date: "2025-04-01", amount: "$29.00", status: "paid" },
    { id: "INV-003", date: "2025-03-01", amount: "$29.00", status: "paid" },
    { id: "INV-002", date: "2025-02-01", amount: "$29.00", status: "paid" },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20 }}>Billing & Plans</h2>
      </div>
      
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Current Plan</div>
          
          <div style={{ background: "linear-gradient(135deg,#1e40af,#1d4ed8)", borderRadius: 10, padding: 20, color: "#fff", marginBottom: 16 }}>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Current plan</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, marginBottom: 4 }}>{user?.plan || "Pro"}</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>$29<span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7 }}>/month</span></div>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            {[
              "500 certificates/month",
              "Unlimited templates",
              "Priority email delivery",
              "Team collaboration",
              "API access",
              "Analytics"
            ].map(feature => (
              <div key={feature} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 13 }}>
                <span style={{ color: "#059669" }}>✓</span> {feature}
              </div>
            ))}
          </div>
          
          <Button variant="outline" style={{ width: "100%", justifyContent: "center" }}>
            Upgrade to Enterprise
          </Button>
        </div>
        
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>Payment Method</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "#f8f7f5", borderRadius: 8 }}>
              <div style={{ width: 40, height: 28, background: "#1a1a2e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", fontWeight: 700, fontSize: 11 }}>
                VISA
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>•••• •••• •••• 4242</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>Expires 12/27</div>
              </div>
              <Button variant="outline" size="sm" style={{ marginLeft: "auto" }}>Update</Button>
            </div>
          </div>
          
          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Billing Summary</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #f3f2ef" }}>
              <span style={{ color: "#6b7280" }}>Next billing date</span>
              <span style={{ fontWeight: 500 }}>June 1, 2025</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #f3f2ef" }}>
              <span style={{ color: "#6b7280" }}>Amount</span>
              <span style={{ fontWeight: 500 }}>$29.00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0" }}>
              <span style={{ color: "#6b7280" }}>Certificates used</span>
              <span style={{ fontWeight: 500 }}>234 / 500</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="section-title" style={{ marginBottom: 16 }}>Invoice History</div>
        <table className="table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td><code style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4 }}>{invoice.id}</code></td>
                <td style={{ fontSize: 13, color: "#6b7280" }}>{invoice.date}</td>
                <td style={{ fontWeight: 500 }}>{invoice.amount}</td>
                <td><Badge variant="green">{invoice.status}</Badge></td>
                <td><Button variant="outline" size="sm">Download PDF</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
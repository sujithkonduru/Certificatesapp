import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Select } from "../common/Select"

export function OrganizationPage({ user }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20 }}>Organization Settings</h2>
      </div>
      
      <div className="grid-2">
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>General Information</div>
          
          <Input
            label="Organization Name"
            defaultValue={user?.organizationName}
          />
          
          <Input
            label="Website"
            defaultValue="https://certflow.io"
          />
          
          <Select
            label="Industry"
            options={["Education & Training", "Technology", "Healthcare", "Finance"]}
            defaultValue="Education & Training"
          />
          
          <Select
            label="Time Zone"
            options={["Asia/Kolkata (IST)", "UTC", "America/New_York (EST)"]}
            defaultValue="Asia/Kolkata (IST)"
          />
          
          <Button>Save Changes</Button>
        </div>
        
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>Current Plan</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{user?.plan || "Pro"}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>Renews on June 1, 2025</div>
              </div>
              <span className="badge badge-blue">{user?.plan || "Pro"}</span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span>Certificates used</span>
                <span style={{ fontWeight: 600 }}>234 / 500</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width: "47%", background: "#2563eb" }}></div>
              </div>
            </div>
            <Button variant="outline" style={{ width: "100%", justifyContent: "center" }}>
              Upgrade Plan
            </Button>
          </div>
          
          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>API Access</div>
            <div style={{ background: "#f3f4f6", borderRadius: 6, padding: 10, fontFamily: "monospace", fontSize: 12, marginBottom: 12, wordBreak: "break-all" }}>
              sk-cf-••••••••••••••••••••••••••••••••
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline" size="sm">Copy Key</Button>
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
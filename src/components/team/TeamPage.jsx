import { useState } from "react"
import { Button } from "../common/Button"
import { Badge } from "../common/Badge"
import { TEAM_MEMBERS } from "../../data/dummyData"

export function TeamPage() {
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Viewer")

  const getRoleBadge = (role) => {
    if (role === "Admin") return "blue"
    if (role === "Editor") return "green"
    return "gray"
  }

  const getStatusBadge = (status) => {
    return status === "active" ? "green" : "orange"
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title" style={{ fontSize: 20, fontFamily: "'Fraunces', serif" }}>
          Team
        </span>
        <Button onClick={() => setShowInvite(true)}>+ Invite Member</Button>
      </div>
      
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_MEMBERS.map(member => (
              <tr key={member.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{member.name}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{member.email}</div>
                    </div>
                  </div>
                </td>
                <td><Badge variant={getRoleBadge(member.role)}>{member.role}</Badge></td>
                <td><Badge variant={getStatusBadge(member.status)}>{member.status}</Badge></td>
                <td style={{ fontSize: 12, color: "#6b7280" }}>{member.joined}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button variant="outline" size="sm">Edit</Button>
                    {member.role !== "Admin" && <Button variant="danger" size="sm">Remove</Button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showInvite && (
        <div className="modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Invite Team Member</div>
            
            <div className="input-wrap">
              <label className="input-label">Email Address *</label>
              <input 
                className="input" 
                type="email" 
                placeholder="colleague@company.com" 
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
              />
            </div>
            
            <div className="input-wrap">
              <label className="input-label">Role</label>
              <select 
                className="select" 
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value)}
              >
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </div>
            
            <div className="input-wrap">
              <label className="input-label">Message (optional)</label>
              <textarea 
                className="input" 
                style={{ resize: "vertical", minHeight: 80 }} 
                placeholder="Add a personal message…" 
              />
            </div>
            
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => setShowInvite(false)} style={{ flex: 1, justifyContent: "center" }}>
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowInvite(false)} style={{ flex: 1, justifyContent: "center" }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
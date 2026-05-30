export function TopBar({ title, user }) {
  return (
    <div className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="topbar-actions">
        <div style={{ fontSize: 12, color: "#6b7280", background: "#f3f4f6", padding: "4px 10px", borderRadius: 20 }}>
          {user?.plan || "Pro"} plan
        </div>
        <div 
          className="avatar" 
          style={{ width: 32, height: 32, cursor: "pointer" }}
          title={user?.email}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}
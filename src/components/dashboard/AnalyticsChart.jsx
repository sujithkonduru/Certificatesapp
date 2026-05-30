export function AnalyticsChart({ data }) {
  const maxGen = Math.max(...data.map(m => m.generated))
  
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="section-header">
        <span className="section-title">Certificate Analytics</span>
        <span style={{ fontSize: 12, color: "#6b7280" }}>Last 6 months</span>
      </div>
      <div className="bar-chart" style={{ height: 130 }}>
        {data.map(item => (
          <div key={item.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 4, position: "relative" }}>
            <div style={{ fontSize: 10, color: "#111", fontWeight: 500 }}>{item.generated}</div>
            <div style={{ width: "100%", height: `${(item.generated / maxGen) * 100}%`, background: "#2563eb", borderRadius: "4px 4px 0 0", opacity: 0.8 }} />
            <div style={{ fontSize: 10, color: "#6b7280" }}>{item.month}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
          <div style={{ width: 10, height: 10, background: "#2563eb", borderRadius: 2 }}></div>
          Generated
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
          <div style={{ width: 10, height: 10, background: "#bfdbfe", borderRadius: 2 }}></div>
          Delivered
        </div>
      </div>
    </div>
  )
}
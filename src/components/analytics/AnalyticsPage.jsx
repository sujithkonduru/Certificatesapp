import { ANALYTICS_DATA, TEMPLATES } from "../../data/dummyData"

export function AnalyticsPage() {
  const maxGen = Math.max(...ANALYTICS_DATA.monthly.map(m => m.generated))
  const maxUses = Math.max(...TEMPLATES.map(t => t.uses))

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginBottom: 4 }}>Analytics</h2>
        <p style={{ color: "#6b7280", fontSize: 13 }}>
          Insights into your certificate generation and delivery performance.
        </p>
      </div>
      
      <div className="stats-grid">
        {[
          ["Total Generated", "1,234", "↑ 23%"],
          ["Delivery Rate", "98.2%", "↑ 0.4%"],
          ["Avg Gen Time", "1.2s", "↓ 0.3s"],
          ["Active Recipients", "856", "↑ 48"]
        ].map(([label, value, change]) => (
          <div key={label} className="stat-card">
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-change">{change}</div>
          </div>
        ))}
      </div>
      
      <div className="grid-2">
        <div className="card">
          <div className="section-title" style={{ marginBottom: 20 }}>Monthly Certificate Generation</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
            {ANALYTICS_DATA.monthly.map(item => (
              <div key={item.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}>{item.generated}</span>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0" }}>
                  <div style={{ height: 8, background: "#bfdbfe", borderRadius: "4px 4px 0 0", width: "100%" }}></div>
                  <div style={{ height: `${(item.generated / maxGen) * 120}px`, background: "#2563eb", width: "100%" }}></div>
                </div>
                <span style={{ fontSize: 10, color: "#6b7280" }}>{item.month}</span>
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
        
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>Top Courses by Certificates</div>
          {ANALYTICS_DATA.topCourses.map((course, index) => (
            <div key={course.name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "#374151", fontWeight: index === 0 ? 600 : 400 }}>{course.name}</span>
                <span style={{ fontWeight: 600, color: "#111" }}>{course.count}</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width: `${(course.count / 160) * 100}%`, background: index === 0 ? "#2563eb" : "#93c5fd" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card" style={{ marginTop: 20 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Template Usage</div>
        <div className="grid-3">
          {TEMPLATES.map(template => (
            <div key={template.id} style={{ textAlign: "center", padding: 16, background: "#f8f7f5", borderRadius: 10 }}>
              <div style={{ width: 40, height: 40, background: template.preview, borderRadius: 8, margin: "0 auto 10px" }}></div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{template.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{template.uses} uses</div>
              <div className="progress-bar" style={{ marginTop: 6 }}>
                <div className="progress-fill" style={{ width: `${(template.uses / maxUses) * 100}%`, background: "#2563eb" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
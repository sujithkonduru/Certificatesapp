import { Button } from "../common/Button"

export function TemplateCard({ template, onEdit, onUse }) {
  return (
    <div className="card" style={{ cursor: "pointer", transition: "box-shadow .15s" }}>
      <div style={{ 
        height: 120, 
        background: template.preview, 
        borderRadius: 8, 
        marginBottom: 16, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        position: "relative", 
        overflow: "hidden" 
      }}>
        <div style={{ color: "rgba(255,255,255,.15)", fontSize: 80, fontFamily: "'Fraunces', serif", fontWeight: 700, position: "absolute" }}>
          C
        </div>
        <div style={{ color: "#fff", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 11, opacity: .7, marginBottom: 2, textTransform: "uppercase", letterSpacing: ".1em" }}>
            Certificate of Completion
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600 }}>John Smith</div>
        </div>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{template.name}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{template.category} · {template.uses} uses</div>
        </div>
        <span className="badge badge-blue">{template.category}</span>
      </div>
      
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {template.fields && template.fields.map(field => (
          <span key={field} style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 8px", borderRadius: 12, color: "#6b7280" }}>
            {field}
          </span>
        ))}
      </div>
      
      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <Button 
          size="sm" 
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => onEdit(template)}
        >
          ✏️ Edit Template
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => onUse(template)}
        >
          📄 Use Template
        </Button>
      </div>
    </div>
  )
}
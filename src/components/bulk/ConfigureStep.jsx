import { useState } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Select } from "../common/Select"

export function ConfigureStep({ onBack, onGenerate }) {
  const [formData, setFormData] = useState({
    template: "Modern Blue",
    course: "Python Bootcamp",
    subject: "Your Certificate of Completion"
  })

  const preview = [
    { name: "Alice Johnson", email: "alice@example.com", course: "Python Bootcamp" },
    { name: "Bob Williams", email: "bob@example.com", course: "Python Bootcamp" },
    { name: "Carol Davis", email: "carol@example.com", course: "Python Bootcamp" },
  ]

  return (
    <div className="card">
      <div className="section-header">
        <span className="section-title">Configure & Preview</span>
      </div>
      
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <Select
          label="Template"
          options={["Modern Blue", "Classic Gold", "Minimal"]}
          value={formData.template}
          onChange={e => setFormData({ ...formData, template: e.target.value })}
        />
        <Input
          label="Course / Achievement"
          value={formData.course}
          onChange={e => setFormData({ ...formData, course: e.target.value })}
        />
      </div>
      
      <Input
        label="Email Subject"
        value={formData.subject}
        onChange={e => setFormData({ ...formData, subject: e.target.value })}
      />
      
      <div style={{ marginTop: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Preview (3 recipients)</div>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Course</th><th>Status</th></tr>
          </thead>
          <tbody>
            {preview.map(p => (
              <tr key={p.email}>
                <td style={{ fontWeight: 500 }}>{p.name}</td>
                <td style={{ fontSize: 12, color: "#6b7280" }}>{p.email}</td>
                <td>{p.course}</td>
                <td><span className="badge badge-blue">Ready</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={onGenerate} style={{ flex: 1, justifyContent: "center" }}>
          Generate {preview.length} Certificates →
        </Button>
      </div>
    </div>
  )
}
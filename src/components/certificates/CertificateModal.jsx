import { useState } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Select } from "../common/Select"

export function CertificateModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    template: "Modern Blue",
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = () => {
    // Handle certificate creation
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Issue New Certificate</div>
        
        <Input
          label="Recipient Name *"
          placeholder="John Smith"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        
        <Input
          label="Recipient Email *"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        
        <Input
          label="Course / Achievement *"
          placeholder="Web Development Bootcamp"
          value={formData.course}
          onChange={e => setFormData({ ...formData, course: e.target.value })}
        />
        
        <Select
          label="Template"
          options={["Modern Blue", "Classic Gold", "Minimal", "Vibrant Green"]}
          value={formData.template}
          onChange={e => setFormData({ ...formData, template: e.target.value })}
        />
        
        <Input
          label="Issue Date"
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
        />
        
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Button onClick={handleSubmit} style={{ flex: 1, justifyContent: "center" }}>
            Issue Certificate
          </Button>
          <Button variant="outline" onClick={onClose} style={{ flex: 1, justifyContent: "center" }}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
import { useState } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Select } from "../common/Select"

export function TemplateModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Professional",
    baseColor: "#1e40af",
    description: ""
  })

  const [previewColor, setPreviewColor] = useState("#1e40af")

  const colors = [
    { name: "Blue", value: "#1e40af" },
    { name: "Gold", value: "#92400e" },
    { name: "Green", value: "#065f46" },
    { name: "Purple", value: "#4c1d95" },
    { name: "Red", value: "#7f1d1d" },
    { name: "Teal", value: "#0f766e" },
    { name: "Pink", value: "#9d174d" },
    { name: "Indigo", value: "#3730a3" }
  ]

  const categories = ["Professional", "Academic", "Corporate", "Award", "Creative", "Minimalist"]

  const handleColorSelect = (color) => {
    setFormData({ ...formData, baseColor: color })
    setPreviewColor(color)
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter a template name")
      return
    }
    
    // Here you would save the template
    console.log("Saving template:", formData)
    
    if (onSave) onSave(formData)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width: 550 }} onClick={e => e.stopPropagation()}>
        <div className="modal-title">Create New Template</div>
        
        <Input
          label="Template Name *"
          placeholder="e.g. Professional Blue"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        
        <Select
          label="Category"
          options={categories}
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        />
        
        <div className="input-wrap">
          <label className="input-label">Base Color</label>
          <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
            {colors.map(color => (
              <div 
                key={color.value} 
                style={{ 
                  width: 36, 
                  height: 36, 
                  background: color.value, 
                  borderRadius: 8, 
                  cursor: "pointer", 
                  border: formData.baseColor === color.value ? "3px solid #fff" : "2px solid transparent",
                  outline: formData.baseColor === color.value ? `2px solid ${color.value}` : "none",
                  boxSizing: "border-box"
                }} 
                onClick={() => handleColorSelect(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <div className="input-wrap">
          <label className="input-label">Description (Optional)</label>
          <textarea 
            className="input" 
            rows="3"
            placeholder="Describe the template purpose and usage..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            style={{ resize: "vertical" }}
          />
        </div>
        
        {/* Live Preview */}
        <div className="input-wrap">
          <label className="input-label">Live Preview</label>
          <div style={{ 
            background: previewColor,
            borderRadius: 12,
            padding: 20,
            marginTop: 6,
            color: "white",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>
              Certificate Preview
            </div>
            <div style={{ 
              fontFamily: "'Fraunces', serif",
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 8
            }}>
              {formData.name || "Template Name"}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              Certificate of Completion
            </div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Button onClick={handleSubmit} style={{ flex: 1, justifyContent: "center" }}>
            Create Template
          </Button>
          <Button variant="outline" onClick={onClose} style={{ flex: 1, justifyContent: "center" }}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from "react"
import { Button } from "../common/Button"
import { Input } from "../common/Input"
import { Select } from "../common/Select"

export function TemplateEditModal({ isOpen, onClose, template, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    baseColor: "",
    description: "",
    fields: []
  })
  
  const [newField, setNewField] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("edit") // edit, preview

  const colors = [
    { name: "Blue", value: "#1e40af" },
    { name: "Gold", value: "#92400e" },
    { name: "Green", value: "#065f46" },
    { name: "Purple", value: "#4c1d95" },
    { name: "Red", value: "#7f1d1d" },
    { name: "Teal", value: "#0f766e" },
    { name: "Pink", value: "#9d174d" },
    { name: "Indigo", value: "#3730a3" },
    { name: "Gray", value: "#374151" },
    { name: "Orange", value: "#c2410c" }
  ]

  const categories = ["Professional", "Academic", "Corporate", "Award", "Creative", "Minimalist", "Luxury"]

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || "",
        category: template.category || "Professional",
        baseColor: template.preview || "#1e40af",
        description: template.description || "",
        fields: template.fields || ["Name", "Course", "Date"]
      })
      setIsEditing(false)
    }
  }, [template])

  if (!isOpen || !template) return null

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Please enter a template name")
      return
    }
    
    const updatedTemplate = {
      ...template,
      name: formData.name,
      category: formData.category,
      preview: formData.baseColor,
      description: formData.description,
      fields: formData.fields,
      lastEdited: new Date().toISOString().split('T')[0]
    }
    
    if (onSave) onSave(updatedTemplate)
    onClose()
  }

  const handleAddField = () => {
    if (newField.trim() && !formData.fields.includes(newField.trim())) {
      setFormData({
        ...formData,
        fields: [...formData.fields, newField.trim()]
      })
      setNewField("")
    }
  }

  const handleRemoveField = (fieldToRemove) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter(f => f !== fieldToRemove)
    })
  }

  const handleMoveField = (index, direction) => {
    const newFields = [...formData.fields]
    if (direction === "up" && index > 0) {
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]]
    } else if (direction === "down" && index < newFields.length - 1) {
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]]
    }
    setFormData({ ...formData, fields: newFields })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="template-edit-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? "Edit Template" : "Template Details"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="template-tabs">
          <button 
            className={`template-tab ${activeTab === "edit" ? "active" : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            ✏️ Edit Details
          </button>
          <button 
            className={`template-tab ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            👁️ Preview
          </button>
        </div>

        {activeTab === "edit" && (
          <div className="template-edit-content">
            {/* Basic Information */}
            <div className="edit-section">
              <h3>Basic Information</h3>
              
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
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  {colors.map(color => (
                    <div 
                      key={color.value} 
                      style={{ 
                        width: 40, 
                        height: 40, 
                        background: color.value, 
                        borderRadius: 8, 
                        cursor: "pointer",
                        border: formData.baseColor === color.value ? "3px solid #2563eb" : "2px solid #e5e7eb",
                        boxShadow: formData.baseColor === color.value ? "0 0 0 2px #fff, 0 0 0 4px #2563eb" : "none"
                      }} 
                      onClick={() => setFormData({ ...formData, baseColor: color.value })}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              <div className="input-wrap">
                <label className="input-label">Description</label>
                <textarea 
                  className="input" 
                  rows="3"
                  placeholder="Describe the template purpose and usage..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>

            {/* Custom Fields */}
            <div className="edit-section">
              <h3>Custom Fields</h3>
              <p className="section-hint">Add fields that will appear on the certificate</p>
              
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input 
                  className="input"
                  placeholder="e.g. Instructor Name, Grade, Date"
                  value={newField}
                  onChange={e => setNewField(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && handleAddField()}
                />
                <Button size="sm" onClick={handleAddField}>Add Field</Button>
              </div>
              
              <div className="fields-list">
                {formData.fields.map((field, index) => (
                  <div key={field} className="field-item">
                    <span className="field-name">{field}</span>
                    <div className="field-actions">
                      <button 
                        className="field-btn"
                        onClick={() => handleMoveField(index, "up")}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button 
                        className="field-btn"
                        onClick={() => handleMoveField(index, "down")}
                        disabled={index === formData.fields.length - 1}
                      >
                        ↓
                      </button>
                      <button 
                        className="field-btn field-btn-danger"
                        onClick={() => handleRemoveField(field)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-footer">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="template-preview-content">
            <div className="certificate-preview">
              <div className="preview-border">
                <div className="preview-decoration-top">
                  <div className="preview-seal">✧</div>
                </div>
                
                <div className="preview-content">
                  <div className="preview-icon">🏆</div>
                  <div className="preview-title">CERTIFICATE OF COMPLETION</div>
                  <div className="preview-subtitle">This certificate is proudly presented to</div>
                  <div className="preview-recipient">[Recipient Name]</div>
                  <div className="preview-description">For successfully completing</div>
                  <div className="preview-course">[Course Name]</div>
                  
                  <div className="preview-fields">
                    {formData.fields.map(field => (
                      <div key={field} className="preview-field">
                        <strong>{field}:</strong> [Value]
                      </div>
                    ))}
                  </div>
                  
                  <div className="preview-signatures">
                    <div className="preview-signature">
                      <div className="signature-line"></div>
                      <div>Authorized Signatory</div>
                    </div>
                    <div className="preview-signature">
                      <div className="signature-line"></div>
                      <div>Date</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <Button variant="outline" onClick={() => setActiveTab("edit")}>Back to Edit</Button>
              <Button onClick={handleSave}>Save & Close</Button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .template-edit-modal {
          background: #fff;
          border-radius: 20px;
          width: 700px;
          max-width: 95vw;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }

        .modal-header h2 {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          margin: 0;
          color: #111;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #111;
        }

        .template-tabs {
          display: flex;
          gap: 4px;
          padding: 0 24px;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .template-tab {
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          color: #6b7280;
          border-bottom: 2px solid transparent;
          background: none;
          border: none;
          transition: all 0.2s;
        }

        .template-tab:hover {
          color: #2563eb;
        }

        .template-tab.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }

        .template-edit-content,
        .template-preview-content {
          padding: 24px;
        }

        .edit-section {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .edit-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #111;
        }

        .section-hint {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .fields-list {
          background: #f9fafb;
          border-radius: 8px;
          padding: 8px;
        }

        .field-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: white;
          border-radius: 6px;
          margin-bottom: 6px;
          border: 1px solid #e5e7eb;
        }

        .field-name {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .field-actions {
          display: flex;
          gap: 4px;
        }

        .field-btn {
          background: #f3f4f6;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.15s;
        }

        .field-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .field-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .field-btn-danger:hover:not(:disabled) {
          background: #fee2e2;
          color: #dc2626;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 20px;
          margin-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        /* Preview Styles */
        .certificate-preview {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 20px;
        }

        .preview-border {
          background: white;
          border-radius: 12px;
          padding: 24px;
          position: relative;
          border: 2px solid #d4af37;
        }

        .preview-decoration-top {
          text-align: center;
          margin-bottom: 20px;
        }

        .preview-seal {
          font-size: 28px;
          color: #d4af37;
          display: inline-block;
        }

        .preview-icon {
          font-size: 40px;
          text-align: center;
          margin-bottom: 12px;
        }

        .preview-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 900;
          text-align: center;
          color: #1e3a8a;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .preview-subtitle {
          text-align: center;
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 16px;
        }

        .preview-recipient {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          color: #d4af37;
          margin-bottom: 12px;
          padding: 8px;
          border-top: 1px solid #f3e7e9;
          border-bottom: 1px solid #f3e7e9;
        }

        .preview-description {
          text-align: center;
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .preview-course {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          color: #1e3a8a;
          margin-bottom: 20px;
        }

        .preview-fields {
          background: #f9fafb;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
        }

        .preview-field {
          font-size: 11px;
          padding: 4px 0;
          color: #374151;
        }

        .preview-signatures {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #f3e7e9;
        }

        .preview-signature {
          text-align: center;
          font-size: 10px;
          color: #6b7280;
        }

        .signature-line {
          width: 120px;
          height: 1px;
          background: #d1d5db;
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  )
}
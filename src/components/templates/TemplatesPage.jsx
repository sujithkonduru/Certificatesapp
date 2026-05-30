import { useState } from "react"
import { Button } from "../common/Button"
import { TemplateCard } from "./TemplateCard"
import { TemplateModal } from "./TemplateModal"
import { TemplateEditModal } from "./TemplateEditModal"
import { TEMPLATES } from "../../data/dummyData"

export function TemplatesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [templates, setTemplates] = useState(TEMPLATES)

  const handleCreateTemplate = (newTemplate) => {
    const templateWithId = {
      id: `T-${templates.length + 1}`.padStart(6, '0'),
      name: newTemplate.name,
      category: newTemplate.category,
      uses: 0,
      lastEdited: new Date().toISOString().split('T')[0],
      preview: newTemplate.baseColor,
      fields: ["Name", "Course", "Date"],
      description: newTemplate.description
    }
    
    setTemplates([templateWithId, ...templates])
    console.log("New template created:", templateWithId)
  }

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template)
    setShowEditModal(true)
  }

  const handleSaveTemplate = (updatedTemplate) => {
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ))
    console.log("Template updated:", updatedTemplate)
  }

  const handleUseTemplate = (template) => {
    alert(`Using template: ${template.name}\n\nThis would create a new certificate with this template.`)
    // You can navigate to certificate creation or open a modal here
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title" style={{ fontSize: 20, fontFamily: "'Fraunces', serif" }}>
          Templates
        </span>
        <Button onClick={() => setShowCreateModal(true)}>+ New Template</Button>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
        {templates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template}
            onEdit={handleEditTemplate}
            onUse={handleUseTemplate}
          />
        ))}
        
        <div 
          className="card" 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            minHeight: 220, 
            border: "2px dashed #e5e7eb", 
            cursor: "pointer", 
            background: "#fafaf8",
            transition: "all 0.2s"
          }} 
          onClick={() => setShowCreateModal(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f3f4f6"
            e.currentTarget.style.borderColor = "#2563eb"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fafaf8"
            e.currentTarget.style.borderColor = "#e5e7eb"
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>+</div>
          <div style={{ fontWeight: 500, color: "#374151" }}>Create New Template</div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>Start from scratch or use a preset</div>
        </div>
      </div>
      
      {showCreateModal && (
        <TemplateModal 
          onClose={() => setShowCreateModal(false)} 
          onSave={handleCreateTemplate}
        />
      )}
      
      {showEditModal && selectedTemplate && (
        <TemplateEditModal 
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          template={selectedTemplate}
          onSave={handleSaveTemplate}
        />
      )}
    </div>
  )
}
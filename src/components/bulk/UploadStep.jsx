import { Button } from "../common/Button"

export function UploadStep({ onUpload, setUploaded }) {
  const handleUpload = () => {
    setUploaded(true)
    onUpload()
  }

  return (
    <div className="card" style={{ textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Upload your file</h3>
      <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>
        Supports CSV and Excel (.xlsx) files. Must include Name and Email columns.
      </p>
      <div 
        style={{ border: "2px dashed #d1d5db", borderRadius: 12, padding: 32, marginBottom: 20, cursor: "pointer", background: "#fafaf8" }}
        onClick={handleUpload}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>⬆️</div>
        <div style={{ fontWeight: 500, marginBottom: 4 }}>Click to upload or drag & drop</div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>CSV, XLSX up to 10MB</div>
      </div>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Or <span style={{ color: "#2563eb", cursor: "pointer" }}>download a sample template</span>
      </p>
    </div>
  )
}
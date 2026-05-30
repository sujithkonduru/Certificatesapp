export function StepIndicator({ currentStep }) {
  const steps = ["Upload CSV", "Configure & Preview", "Generate"]
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {steps.map((label, index) => (
        <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: currentStep > index + 1 ? "#059669" : currentStep === index + 1 ? "#2563eb" : "#e5e7eb",
              color: currentStep >= index + 1 ? "#fff" : "#9ca3af",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 600, marginBottom: 4
            }}>
              {currentStep > index + 1 ? "✓" : index + 1}
            </div>
            <div style={{ fontSize: 11, color: currentStep === index + 1 ? "#2563eb" : "#9ca3af", fontWeight: currentStep === index + 1 ? 600 : 400 }}>
              {label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div style={{ height: 2, flex: 0.5, background: currentStep > index + 2 ? "#059669" : "#e5e7eb", margin: "0 4px", marginBottom: 20 }} />
          )}
        </div>
      ))}
    </div>
  )
}
import { useState } from "react"
import { StepIndicator } from "./StepIndicator"
import { UploadStep } from "./UploadStep"
import { ConfigureStep } from "./ConfigureStep"
import { GenerateStep } from "./GenerateStep"

export function BulkGeneratePage() {
  const [step, setStep] = useState(1)
  const [, setUploaded] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, marginBottom: 4 }}>
          Bulk Certificate Generation
        </h2>
        <p style={{ color: "#6b7280", fontSize: 13 }}>
          Upload a CSV or Excel file to generate certificates for multiple recipients at once.
        </p>
      </div>
      
      <StepIndicator currentStep={step} />
      
      {step === 1 && <UploadStep onUpload={() => setStep(2)} setUploaded={setUploaded} />}
      {step === 2 && <ConfigureStep onBack={() => setStep(1)} onGenerate={() => setStep(3)} />}
      {step === 3 && <GenerateStep onReset={() => { setStep(1); setUploaded(false) }} />}
    </div>
  )
}
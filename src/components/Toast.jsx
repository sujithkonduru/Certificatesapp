import { useEffect } from "react"

export function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])
  
  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      background: type === "error" ? "#dc2626" : "#059669",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 500,
      zIndex: 2000,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}>
      {message}
    </div>
  )
}
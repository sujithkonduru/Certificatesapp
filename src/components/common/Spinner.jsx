export function Spinner({ size = 16, color = "#fff" }) {
  return (
    <div 
      className="spinner" 
      style={{ 
        width: size, 
        height: size, 
        borderColor: `${color}33`,
        borderTopColor: color
      }} 
    />
  )
}
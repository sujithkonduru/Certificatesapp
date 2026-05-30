export function Badge({ children, variant = "blue" }) {
  const variants = {
    green: "badge-green",
    orange: "badge-orange",
    red: "badge-red",
    blue: "badge-blue",
    gray: "badge-gray"
  }
  
  return <span className={`badge ${variants[variant]}`}>{children}</span>
}
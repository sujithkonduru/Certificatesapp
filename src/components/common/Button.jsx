export function Button({ children, variant = "primary", size = "md", onClick, disabled, type = "button", className = "", style = {}, ...props }) {
  const variants = {
    primary: "btn btn-primary",
    outline: "btn btn-outline",
    danger: "btn btn-danger"
  }
  
  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: ""
  }
  
  return (
    <button
      type={type}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}
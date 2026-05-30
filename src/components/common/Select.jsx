export function Select({ label, options, value, onChange, ...props }) {
  return (
    <div className="input-wrap">
      {label && <label className="input-label">{label}</label>}
      <select className="select" value={value} onChange={onChange} {...props}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
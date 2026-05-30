export function CertificateFilters({ search, onSearchChange, filter, onFilterChange, totalCount }) {
  const filters = ["all", "delivered", "pending", "failed"]
  
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
      <div className="search-bar">
        <span style={{ color: "#9ca3af" }}>🔍</span>
        <input 
          placeholder="Search certificates…" 
          value={search} 
          onChange={e => onSearchChange(e.target.value)} 
        />
      </div>
      {filters.map(f => (
        <span 
          key={f} 
          className={`chip ${filter === f ? "selected" : ""}`} 
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </span>
      ))}
      <span style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280", alignSelf: "center" }}>
        {totalCount} certificates
      </span>
    </div>
  )
}
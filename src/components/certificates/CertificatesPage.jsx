import { useState } from "react"
import { Button } from "../common/Button"
import { CertificateTable } from "./CertificateTable"
import { CertificateModal } from "./CertificateModal"
import { CertificateViewModal } from "./CertificateViewModal"
import { CertificateFilters } from "./CertificateFilters"
import { CERTIFICATES } from "../../data/dummyData"

export function CertificatesPage() {
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  
  const filtered = CERTIFICATES.filter(cert =>
    (filter === "all" || cert.status === filter) &&
    (cert.name.toLowerCase().includes(search.toLowerCase()) || 
     cert.course.toLowerCase().includes(search.toLowerCase()))
  )

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate)
    setShowViewModal(true)
  }

  return (
    <div>
      <div className="section-header">
        <span className="section-title" style={{ fontSize: 20, fontFamily: "'Fraunces', serif" }}>
          Certificates
        </span>
        <Button onClick={() => setShowModal(true)}>+ Issue Certificate</Button>
      </div>
      
      <div className="card">
        <CertificateFilters 
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          totalCount={filtered.length}
        />
        <CertificateTable 
          certificates={filtered} 
          onViewCertificate={handleViewCertificate}
        />
        {filtered.length === 0 && <div className="empty-state">No certificates found</div>}
      </div>
      
      {showModal && <CertificateModal onClose={() => setShowModal(false)} />}
      
      <CertificateViewModal 
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        certificate={selectedCertificate}
      />
    </div>
  )
}
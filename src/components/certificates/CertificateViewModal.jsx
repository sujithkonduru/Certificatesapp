import { useState, useEffect } from "react"

/**
 * CertificateViewModal
 * ─────────────────────────────────────────────
 * Props:
 *   isOpen      {boolean}  – controls visibility
 *   onClose     {function} – called to close the modal
 *   certificate {object}   – { id, name, course, date, status, template, email }
 *
 * Usage:
 *   <CertificateViewModal
 *     isOpen={!!selectedCert}
 *     onClose={() => setSelectedCert(null)}
 *     certificate={selectedCert}
 *   />
 */
export function CertificateViewModal({ isOpen, onClose, certificate }) {
  const [toastMsg, setToastMsg]       = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  if (!isOpen || !certificate) return null

  // ── Helpers ──────────────────────────────────────────────────
  const showToast = (msg) => {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  const handlePrint = () => {
    showToast("🖨 Opening print dialog…")
    const printContent = document.getElementById("cert-printable")
    if (!printContent) return
    const win = window.open("", "_blank")
    win.document.write(`
      <html>
        <head>
          <title>${certificate.name} – Certificate</title>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
          <style>
            * { margin:0; padding:0; box-sizing:border-box }
            body { background:#0f0e0c; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:32px; font-family:'Lato',sans-serif }
            @media print { body { background:#0f0e0c; padding:0 } }
          </style>
        </head>
        <body>${printContent.outerHTML}</body>
      </html>
    `)
    win.document.close()
    setTimeout(() => win.print(), 600)
  }

  const handleDownload = () => {
    showToast("📄 PDF download would trigger here in production")
  }

  const handleShare = () => {
    const text = `Certificate: ${certificate.name} – ${certificate.course} (${certificate.id})`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast("✓ Link copied to clipboard"))
    } else {
      showToast("✓ Certificate details copied")
    }
  }

  // ── Status badge config ───────────────────────────────────────
  const statusConfig = {
    delivered: { label: "✓ Certified", style: { background: "rgba(26,80,40,.7)",  color: "#4caf70", border: "1px solid rgba(76,175,112,.35)" } },
    pending:   { label: "⏳ Pending",  style: { background: "rgba(80,60,10,.7)",  color: "#d4af30", border: "1px solid rgba(212,175,48,.35)" } },
    failed:    { label: "✕ Failed",   style: { background: "rgba(80,20,20,.7)",  color: "#e05050", border: "1px solid rgba(224,80,80,.35)"  } },
  }
  const statusBadge = statusConfig[certificate.status] || statusConfig.pending

  // ── Decorative QR pattern (7×7 grid) ─────────────────────────
  const QR_PATTERN = [
    1,1,1,0,1,1,1,
    1,0,0,0,0,0,1,
    1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,
    1,0,0,0,0,0,1,
    1,1,1,0,1,1,1,
    0,0,0,0,0,0,0,
  ]

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Backdrop ── */}
      <div style={S.overlay} onClick={onClose}>

        {/* ── Modal shell ── */}
        <div style={S.modal} onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div style={S.modalHeader}>
            <span style={S.modalTitle}>Certificate Preview</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={S.idPill}>{certificate.id}</span>
              <button style={S.closeBtn} onClick={onClose}>✕</button>
            </div>
          </div>

          {/* ── Scrollable area ── */}
          <div style={S.scrollArea}>

            {/* Printable certificate */}
            <div id="cert-printable" style={S.certOuter}>

              {/* Crosshatch texture */}
              <div style={S.texture} />

              {/* Status stamp */}
              <div style={{ ...S.statusStamp, ...statusBadge.style }}>
                {statusBadge.label}
              </div>

              {/* Background watermark */}
              <div style={S.watermark}>CERTFLOW</div>

              {/* ── Triple border frame ── */}
              <div style={S.border1}>
                {/* Corner ornaments */}
                {[S.cornerTL, S.cornerTR, S.cornerBL, S.cornerBR].map((pos, i) => (
                  <div key={i} style={{ ...S.corner, ...pos }}>✦</div>
                ))}

                <div style={S.border2}>
                  <div style={S.border3}>
                    <div style={S.certBody}>

                      {/* ── Emblem row ── */}
                      <div style={S.emblemRow}>
                        <div style={S.dividerLine} />
                        <div style={S.emblem}>
                          <svg width="32" height="32" viewBox="0 0 34 34" fill="none"
                            stroke="#fff" strokeWidth="1.5" strokeLinejoin="round">
                            <path d="M17 4 L20 13 L30 13 L22 19 L25 28 L17 22 L9 28 L12 19 L4 13 L14 13 Z" />
                          </svg>
                        </div>
                        <div style={{ ...S.dividerLine, background: "linear-gradient(to left, transparent, rgba(184,146,74,.55))" }} />
                      </div>

                      {/* Issuer */}
                      <div style={S.issuer}>CertFlow Institute of Excellence</div>

                      {/* Title */}
                      <div style={S.certTitle}>Certificate of Completion</div>
                      <div style={S.certTitleSub}>· Excellence · Achievement · Recognition ·</div>

                      {/* Ribbon divider */}
                      <div style={S.ribbon}>
                        <div style={S.ribLine} />
                        <div style={S.ribDiamond} />
                        <div style={{ ...S.ribLine, background: "linear-gradient(to left, transparent, rgba(184,146,74,.5))" }} />
                      </div>

                      {/* Presented to */}
                      <div style={S.presentedText}>This certificate is proudly presented to</div>

                      {/* Recipient name */}
                      <div style={S.recipientName}>{certificate.name}</div>

                      {/* Calligraphic underline */}
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                        <svg width="300" height="10" viewBox="0 0 300 10" fill="none">
                          <path d="M15 5 Q150 2 285 5"  stroke="rgba(184,146,74,0.55)" strokeWidth="1" />
                          <path d="M40 7.5 Q150 5 260 7.5" stroke="rgba(184,146,74,0.25)" strokeWidth="0.6" />
                        </svg>
                      </div>

                      {/* For completing */}
                      <div style={S.forText}>in recognition of successfully completing</div>

                      {/* Course name */}
                      <div style={S.courseName}>{certificate.course}</div>

                      {/* Meta row */}
                      <div style={S.metaRow}>
                        <MetaItem label="Date Issued"  value={certificate.date} />
                        <div style={S.metaDivider} />
                        <MetaItem label="Template"     value={certificate.template} />
                        <div style={S.metaDivider} />
                        <MetaItem label="Status"       value={certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)} />
                      </div>

                      {/* Signature row */}
                      <div style={S.sigRow}>
                        <SigBlock name="John A. Smith"    title="Course Director" />
                        <SigBlock name="Sarah L. Johnson" title="Academic Coordinator" />
                      </div>

                      {/* Bottom row: seal · cert ID · QR */}
                      <div style={S.sealRow}>

                        {/* Wax seal */}
                        <div style={S.seal}>
                          <div style={S.sealRing} />
                          <div style={S.sealCheck}>✓</div>
                          <div style={S.sealText}>VERIFIED{"\n"}AUTHENTIC</div>
                        </div>

                        {/* Certificate ID */}
                        <div style={{ textAlign: "center", flex: 1 }}>
                          <div style={S.certIdLabel}>Certificate ID</div>
                          <div style={S.certIdVal}>{certificate.id}</div>
                        </div>

                        {/* QR code */}
                        <div style={{ textAlign: "center" }}>
                          <div style={S.qrGrid}>
                            {QR_PATTERN.map((v, i) => (
                              <div key={i} style={v ? S.qrDark : S.qrLight} />
                            ))}
                          </div>
                          <div style={S.qrText}>Scan to verify</div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer actions ── */}
          <div style={S.modalFooter}>
            <button style={S.footerBtn}                       onClick={handlePrint}>🖨 Print</button>
            <button style={S.footerBtn}                       onClick={handleShare}>↗ Share</button>
            <button style={S.footerBtn}                       onClick={handleDownload}>⬇ Download PDF</button>
            <button style={{ ...S.footerBtn, ...S.footerBtnPrimary }} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {/* ── Toast notification ── */}
      {toastVisible && <div style={S.toast}>{toastMsg}</div>}
    </>
  )
}

// ─── Sub-components ────────────────────────────────────────────
function MetaItem({ label, value }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={S.metaLabel}>{label}</div>
      <div style={S.metaValue}>{value}</div>
    </div>
  )
}

function SigBlock({ name, title }) {
  return (
    <div style={S.sigBlock}>
      <div style={S.sigName}>{name}</div>
      <div style={S.sigLineRule} />
      <div style={S.sigTitle}>{title}</div>
    </div>
  )
}

// ─── Style tokens ───────────────────────────────────────────────
const gold       = "rgba(184,146,74,1)"
const goldFaint  = "rgba(184,146,74,0.45)"
const goldGhost  = "rgba(184,146,74,0.18)"
const darkBg     = "#0f0e0c"

const S = {
  // Overlay
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.78)",
    backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: 16,
  },

  // Modal shell
  modal: {
    background: darkBg,
    borderRadius: 10,
    width: 720,
    maxWidth: "95vw",
    maxHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: `0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px ${goldFaint}`,
  },

  // Modal header
  modalHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "15px 22px",
    borderBottom: `1px solid ${goldGhost}`,
    flexShrink: 0,
  },
  modalTitle: {
    fontFamily: "'Cinzel', serif",
    fontSize: 13, letterSpacing: ".18em",
    color: "#b8924a", textTransform: "uppercase",
  },
  idPill: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 11, letterSpacing: ".12em",
    color: "#5a4020",
    background: goldGhost,
    border: `1px solid ${goldGhost}`,
    padding: "3px 10px", borderRadius: 4,
  },
  closeBtn: {
    background: "none", border: "none",
    color: "#5a4020", fontSize: 18,
    cursor: "pointer", lineHeight: 1,
    padding: "4px 6px", borderRadius: 6,
  },

  // Scroll area
  scrollArea: {
    flex: 1, overflowY: "auto",
    padding: 22,
    background: "#0a0908",
  },

  // Certificate outer shell
  certOuter: {
    background: "linear-gradient(155deg, #1d1a11 0%, #111009 45%, #191508 100%)",
    borderRadius: 4,
    padding: 22,
    position: "relative",
    overflow: "hidden",
  },
  texture: {
    position: "absolute", inset: 0,
    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(184,146,74,0.012) 2px, rgba(184,146,74,0.012) 4px)",
    pointerEvents: "none",
  },

  // Status stamp
  statusStamp: {
    position: "absolute", top: 18, right: 18,
    fontFamily: "'Cinzel', serif",
    fontSize: 9, letterSpacing: ".22em",
    textTransform: "uppercase",
    padding: "4px 12px", borderRadius: 2,
    transform: "rotate(3deg)", zIndex: 10,
  },

  // Watermark
  watermark: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%, -50%) rotate(-28deg)",
    fontFamily: "'Cinzel', serif",
    fontSize: 66, color: "rgba(184,146,74,0.025)",
    letterSpacing: ".35em", pointerEvents: "none",
    whiteSpace: "nowrap", fontWeight: 700, zIndex: 0,
  },

  // Triple border
  border1: {
    border: `1px solid ${goldFaint}`,
    borderRadius: 2, padding: 15, position: "relative",
  },
  border2: {
    border: `2px solid rgba(184,146,74,0.3)`,
    borderRadius: 1, padding: 13, position: "relative",
  },
  border3: {
    border: `1px solid rgba(184,146,74,0.18)`,
    borderRadius: 1,
  },

  // Corner ornaments
  corner: {
    position: "absolute", width: 22, height: 22,
    color: "#b8924a", fontSize: 15,
    display: "flex", alignItems: "center", justifyContent: "center",
    opacity: .9, zIndex: 2,
  },
  cornerTL: { top: -1, left: -1 },
  cornerTR: { top: -1, right: -1, transform: "scaleX(-1)" },
  cornerBL: { bottom: -1, left: -1,  transform: "scaleY(-1)" },
  cornerBR: { bottom: -1, right: -1, transform: "scale(-1)" },

  // Certificate body
  certBody: { padding: "26px 34px", position: "relative" },

  // Emblem row
  emblemRow: {
    display: "flex", alignItems: "center", gap: 0, marginBottom: 18,
  },
  dividerLine: {
    flex: 1, height: 1,
    background: "linear-gradient(to right, transparent, rgba(184,146,74,.55))",
  },
  emblem: {
    width: 58, height: 58, borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #c9a35b, #7a5a20)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 16px", flexShrink: 0,
    boxShadow: `0 0 0 2px rgba(184,146,74,.3), 0 0 18px rgba(184,146,74,.1)`,
  },

  // Text hierarchy
  issuer: {
    fontFamily: "'Cinzel', serif", fontSize: 8.5,
    letterSpacing: ".32em", color: "#4e3c18",
    textAlign: "center", textTransform: "uppercase", marginBottom: 6,
  },
  certTitle: {
    fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700,
    letterSpacing: ".14em", textAlign: "center",
    color: "#b8924a", textTransform: "uppercase",
    marginBottom: 4, lineHeight: 1.2,
  },
  certTitleSub: {
    fontFamily: "'Cinzel', serif", fontSize: 8.5,
    letterSpacing: ".38em", textAlign: "center",
    color: "#3e2e0e", textTransform: "uppercase", marginBottom: 22,
  },

  // Ribbon
  ribbon: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: 12, marginBottom: 20,
  },
  ribLine: {
    height: 1, width: 80,
    background: "linear-gradient(to right, transparent, rgba(184,146,74,.5))",
  },
  ribDiamond: {
    width: 6, height: 6, background: "#b8924a", transform: "rotate(45deg)",
  },

  presentedText: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
    fontStyle: "italic", textAlign: "center",
    color: "#6a5a3a", letterSpacing: ".05em", marginBottom: 8,
  },
  recipientName: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 42,
    fontWeight: 600, fontStyle: "italic", textAlign: "center",
    color: "#d4af6a", lineHeight: 1.1, marginBottom: 6,
    textShadow: "0 2px 16px rgba(184,146,74,0.18)",
  },
  forText: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
    textAlign: "center", color: "#6a5a3a",
    marginBottom: 7, letterSpacing: ".04em",
  },
  courseName: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 21,
    fontWeight: 700, textAlign: "center", color: "#c9a35b",
    marginBottom: 26, lineHeight: 1.3, padding: "0 20px",
  },

  // Meta row
  metaRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 26, padding: "0 10px",
  },
  metaLabel: {
    fontFamily: "'Cinzel', serif", fontSize: 7,
    letterSpacing: ".22em", color: "#42300e",
    textTransform: "uppercase", marginBottom: 5,
  },
  metaValue: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 13, fontWeight: 600, color: "#a89060",
  },
  metaDivider: {
    width: 1, height: 34, background: "rgba(184,146,74,.18)",
  },

  // Signatures
  sigRow: {
    display: "flex", justifyContent: "space-around",
    gap: 24, marginBottom: 24, padding: "0 20px",
  },
  sigBlock: { flex: 1, textAlign: "center", maxWidth: 180 },
  sigName: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 17,
    fontStyle: "italic", color: "#c9a35b",
    marginBottom: 5, lineHeight: 1,
  },
  sigLineRule: {
    height: 1,
    background: "linear-gradient(to right, transparent, rgba(184,146,74,.4), transparent)",
    marginBottom: 5,
  },
  sigTitle: {
    fontFamily: "'Cinzel', serif", fontSize: 7,
    letterSpacing: ".15em", color: "#42300e", textTransform: "uppercase",
  },

  // Seal row
  sealRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", padding: "0 10px",
  },
  seal: {
    width: 68, height: 68, borderRadius: "50%",
    border: `2px solid rgba(184,146,74,.42)`,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "radial-gradient(circle at 40% 40%, rgba(184,146,74,.08), transparent)",
    position: "relative",
  },
  sealRing: {
    position: "absolute", inset: 5, borderRadius: "50%",
    border: "1px dashed rgba(184,146,74,.2)",
  },
  sealCheck: { fontSize: 15, color: "#b8924a", marginBottom: 2 },
  sealText: {
    fontFamily: "'Cinzel', serif", fontSize: 6,
    letterSpacing: ".12em", color: "#4e3a18",
    textTransform: "uppercase", textAlign: "center",
    whiteSpace: "pre-line", lineHeight: 1.5,
  },

  certIdLabel: {
    fontFamily: "'Cinzel', serif", fontSize: 7,
    letterSpacing: ".22em", color: "#32220a",
    textTransform: "uppercase", marginBottom: 4,
  },
  certIdVal: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 11, letterSpacing: ".15em", color: "#5a4020",
  },

  // QR
  qrGrid: {
    width: 52, height: 52,
    display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
    gap: 1, background: "#1a1508", borderRadius: 4, padding: 5,
  },
  qrDark:  { borderRadius: 1, background: "#b8924a" },
  qrLight: { borderRadius: 1, background: "#251e08" },
  qrText: {
    fontFamily: "'Cinzel', serif", fontSize: 6,
    letterSpacing: ".1em", color: "#3e2e0e",
    marginTop: 4, textTransform: "uppercase",
  },

  // Modal footer
  modalFooter: {
    display: "flex", gap: 8, padding: "13px 20px",
    borderTop: `1px solid ${goldGhost}`,
    justifyContent: "flex-end", flexShrink: 0,
  },
  footerBtn: {
    padding: "7px 16px", borderRadius: 6,
    fontFamily: "'Cinzel', serif",
    fontSize: 9.5, letterSpacing: ".12em",
    textTransform: "uppercase", cursor: "pointer",
    border: `1px solid rgba(184,146,74,.28)`,
    color: "#a89060", background: "transparent", transition: "all .15s",
  },
  footerBtnPrimary: {
    background: "#b8924a", color: darkBg, borderColor: "#b8924a",
  },

  // Toast
  toast: {
    position: "fixed", bottom: 24, right: 24,
    background: "#1e1a12",
    border: `1px solid #b8924a`,
    borderRadius: 8, padding: "10px 18px",
    fontSize: 13, color: "#d4af6a",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    zIndex: 9999,
    fontFamily: "'Lato', sans-serif",
  },
}
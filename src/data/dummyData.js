export const CERTIFICATES = [
  { id:"CERT-001", name:"John Smith", course:"Web Development Bootcamp", date:"2025-05-14", status:"delivered", template:"Modern Blue", email:"john.smith@gmail.com" },
  { id:"CERT-002", name:"Sarah Johnson", course:"Data Science Fundamentals", date:"2025-05-14", status:"delivered", template:"Classic Gold", email:"sarah.j@outlook.com" },
  { id:"CERT-003", name:"Michael Brown", course:"UX Design Mastery", date:"2025-05-13", status:"pending", template:"Modern Blue", email:"m.brown@yahoo.com" },
  { id:"CERT-004", name:"Emily Davis", course:"Cloud Computing Essentials", date:"2025-05-13", status:"delivered", template:"Minimal", email:"emily.d@gmail.com" },
  { id:"CERT-005", name:"James Wilson", course:"Machine Learning A-Z", date:"2025-05-12", status:"delivered", template:"Classic Gold", email:"jwilson@company.com" },
  { id:"CERT-006", name:"Olivia Martinez", course:"Project Management Pro", date:"2025-05-12", status:"failed", template:"Minimal", email:"olivia.m@gmail.com" },
  { id:"CERT-007", name:"William Anderson", course:"Cybersecurity Basics", date:"2025-05-11", status:"delivered", template:"Modern Blue", email:"w.anderson@corp.io" },
  { id:"CERT-008", name:"Ava Thompson", course:"Digital Marketing 101", date:"2025-05-11", status:"delivered", template:"Minimal", email:"ava.t@startup.co" },
  { id:"CERT-009", name:"Liam Garcia", course:"Agile & Scrum Mastery", date:"2025-05-10", status:"delivered", template:"Classic Gold", email:"liam.g@enterprise.com" },
  { id:"CERT-010", name:"Sophia Lee", course:"Leadership Fundamentals", date:"2025-05-10", status:"pending", template:"Minimal", email:"sophia.l@edu.org" },
]

export const TEMPLATES = [
  { id:"T-001", name:"Modern Blue", category:"Professional", uses:456, lastEdited:"2025-05-10", preview:"#1e40af", fields:["Name","Course","Date","Instructor"] },
  { id:"T-002", name:"Classic Gold", category:"Academic", uses:312, lastEdited:"2025-05-08", preview:"#92400e", fields:["Name","Degree","Institution","Year"] },
  { id:"T-003", name:"Minimal", category:"Corporate", uses:201, lastEdited:"2025-05-12", preview:"#1f2937", fields:["Name","Achievement","Date"] },
  { id:"T-004", name:"Vibrant Green", category:"Award", uses:87, lastEdited:"2025-05-05", preview:"#065f46", fields:["Name","Award","Presented By","Date"] },
]

export const RECIPIENTS = [
  { id:"R-001", name:"John Smith", email:"john.smith@gmail.com", certs:3, lastCert:"2025-05-14", org:"TechBootcamp Inc" },
  { id:"R-002", name:"Sarah Johnson", email:"sarah.j@outlook.com", certs:1, lastCert:"2025-05-14", org:"DataLearn Academy" },
  { id:"R-003", name:"Michael Brown", email:"m.brown@yahoo.com", certs:2, lastCert:"2025-05-13", org:"Design School" },
  { id:"R-004", name:"Emily Davis", email:"emily.d@gmail.com", certs:1, lastCert:"2025-05-13", org:"CloudPro Training" },
  { id:"R-005", name:"James Wilson", email:"jwilson@company.com", certs:4, lastCert:"2025-05-12", org:"ML Institute" },
  { id:"R-006", name:"Olivia Martinez", email:"olivia.m@gmail.com", certs:1, lastCert:"2025-05-12", org:"PM Academy" },
  { id:"R-007", name:"William Anderson", email:"w.anderson@corp.io", certs:2, lastCert:"2025-05-11", org:"SecureLearn" },
  { id:"R-008", name:"Ava Thompson", email:"ava.t@startup.co", certs:1, lastCert:"2025-05-11", org:"MarketPro" },
]

export const EMAIL_LOGS = [
  { id:"E-001", to:"john.smith@gmail.com", subject:"Your Web Development Certificate", status:"delivered", time:"2025-05-14 14:32", certId:"CERT-001" },
  { id:"E-002", to:"sarah.j@outlook.com", subject:"Your Data Science Certificate", status:"delivered", time:"2025-05-14 10:15", certId:"CERT-002" },
  { id:"E-003", to:"m.brown@yahoo.com", subject:"Your UX Design Certificate", status:"pending", time:"2025-05-13 16:45", certId:"CERT-003" },
  { id:"E-004", to:"emily.d@gmail.com", subject:"Your Cloud Computing Certificate", status:"delivered", time:"2025-05-13 09:20", certId:"CERT-004" },
  { id:"E-005", to:"olivia.m@gmail.com", subject:"Your Project Management Certificate", status:"bounced", time:"2025-05-12 11:00", certId:"CERT-006" },
  { id:"E-006", to:"w.anderson@corp.io", subject:"Your Cybersecurity Certificate", status:"delivered", time:"2025-05-11 13:55", certId:"CERT-007" },
]

export const ANALYTICS_DATA = {
  monthly: [
    { month:"Dec", generated:89, delivered:82 },
    { month:"Jan", generated:124, delivered:118 },
    { month:"Feb", generated:98, delivered:91 },
    { month:"Mar", generated:156, delivered:149 },
    { month:"Apr", generated:203, delivered:195 },
    { month:"May", generated:234, delivered:226 },
  ],
  topCourses: [
    { name:"Web Development", count:156 },
    { name:"Data Science", count:134 },
    { name:"UX Design", count:98 },
    { name:"Cloud Computing", count:87 },
    { name:"Machine Learning", count:76 },
  ]
}

export const TEAM_MEMBERS = [
  { id:"M-001", name:"Admin User", email:"admin@certflow.com", role:"Admin", status:"active", joined:"2024-01-15" },
  { id:"M-002", name:"Jane Cooper", email:"jane@certflow.com", role:"Editor", status:"active", joined:"2024-03-20" },
  { id:"M-003", name:"Bob Martinez", email:"bob@certflow.com", role:"Viewer", status:"active", joined:"2024-06-10" },
  { id:"M-004", name:"Alice Chen", email:"alice@certflow.com", role:"Editor", status:"pending", joined:"2025-04-28" },
]
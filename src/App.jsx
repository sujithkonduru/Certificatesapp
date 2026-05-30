import { useState } from "react"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import { LoginPage } from "./components/auth/LoginPage"
import { RegisterPage } from "./components/auth/RegisterPage"
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage"
import { LandingPage } from "./components/landing/LandingPage"
import { DashboardHome } from "./components/dashboard/DashboardHome"
import { CertificatesPage } from "./components/certificates/CertificatesPage"
import { TemplatesPage } from "./components/templates/TemplatesPage"
import { BulkGeneratePage } from "./components/bulk/BulkGeneratePage"
import { RecipientsPage } from "./components/recipients/RecipientsPage"
import { VerificationPage } from "./components/verification/VerificationPage"
import { EmailLogsPage } from "./components/emails/EmailLogsPage"
import { AnalyticsPage } from "./components/analytics/AnalyticsPage"
import { OrganizationPage } from "./components/organization/OrganizationPage"
import { TeamPage } from "./components/team/TeamPage"
import { BillingPage } from "./components/billing/BillingPage"
import { SettingsPage } from "./components/settings/SettingsPage"
import "./styles/global.css"

function AppContent() {
  const { isAuthenticated, user } = useAuth()
  const [page, setPage] = useState("dashboard")

  if (!isAuthenticated) {
    if (page === "login") return <LoginPage onNavigate={setPage} />
    if (page === "register") return <RegisterPage onNavigate={setPage} />
    if (page === "forgot-password") return <ForgotPasswordPage onNavigate={setPage} />
    return <LandingPage onNavigate={setPage} />
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardHome user={user} />
      case "certificates": return <CertificatesPage />
      case "templates": return <TemplatesPage />
      case "bulk": return <BulkGeneratePage />
      case "recipients": return <RecipientsPage />
      case "verification": return <VerificationPage />
      case "emails": return <EmailLogsPage />
      case "analytics": return <AnalyticsPage />
      case "organization": return <OrganizationPage user={user} />
      case "team": return <TeamPage />
      case "billing": return <BillingPage user={user} />
      case "settings": return <SettingsPage user={user} />
      default: return <DashboardHome user={user} />
    }
  }

  return (
    <DashboardLayout activePage={page} onPageChange={setPage}>
      {renderPage()}
    </DashboardLayout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
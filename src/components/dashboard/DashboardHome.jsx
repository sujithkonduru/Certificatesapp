// src/components/dashboard/DashboardHome.jsx
import { useAuth } from "../../context/AuthContext"
import { StatCard } from "../common/StatCard"
import { Button } from "../common/Button" 
import { RecentCertificates } from "./RecentCertificates"
import { AnalyticsChart } from "./AnalyticsChart"
import { TopCourses } from "./TopCourses"
import { ANALYTICS_DATA, CERTIFICATES } from "../../data/dummyData"

export function DashboardHome({ user }) {
  const { hasPermission, getPlanFeatures } = useAuth()
  const planFeatures = getPlanFeatures(user?.plan)
  
  const getRoleBasedStats = () => {
    const role = user?.role
    
    if (role === "super_admin") {
      return [
        { label: "Total Organizations", value: "156", change: "+12 this month", icon: "🏢", bgColor: "#eff6ff", color: "#2563eb" },
        { label: "Total Certificates", value: "45,231", change: "+18% this month", icon: "🏆", bgColor: "#ecfdf5", color: "#059669" },
        { label: "Active Users", value: "2,847", change: "+234 this month", icon: "👥", bgColor: "#fffbeb", color: "#d97706" },
        { label: "Revenue", value: "$124,231", change: "+23% this month", icon: "💰", bgColor: "#f5f3ff", color: "#7c3aed" },
      ]
    } else if (role === "admin") {
      return [
        { label: "Total Certificates", value: "1,234", change: "+12% this month", icon: "🏆", bgColor: "#eff6ff", color: "#2563eb" },
        { label: "Active Templates", value: "12", change: "+2 this month", icon: "📄", bgColor: "#ecfdf5", color: "#059669" },
        { label: "Team Members", value: "8", change: "+2 this month", icon: "👥", bgColor: "#fffbeb", color: "#d97706" },
        { label: "API Calls", value: "2,847", change: "+18% this month", icon: "🔌", bgColor: "#f5f3ff", color: "#7c3aed" },
      ]
    } else if (role === "manager") {
      return [
        { label: "Team Certificates", value: "456", change: "+8% this month", icon: "🏆", bgColor: "#eff6ff", color: "#2563eb" },
        { label: "Team Members", value: "5", change: "+1 this month", icon: "👥", bgColor: "#ecfdf5", color: "#059669" },
        { label: "Pending Reviews", value: "3", change: "Awaiting approval", icon: "⏳", bgColor: "#fffbeb", color: "#d97706" },
        { label: "Monthly Limit", value: `${planFeatures.maxCertsPerMonth}`, change: `${user?.plan} plan`, icon: "📊", bgColor: "#f5f3ff", color: "#7c3aed" },
      ]
    } else {
      return [
        { label: "My Certificates", value: "24", change: "+3 this month", icon: "🏆", bgColor: "#eff6ff", color: "#2563eb" },
        { label: "Available Templates", value: planFeatures.maxTemplates.toString(), change: `${user?.plan} plan`, icon: "📄", bgColor: "#ecfdf5", color: "#059669" },
        { label: "Credits Used", value: `${CERTIFICATES.length}/${planFeatures.maxCertsPerMonth}`, change: `${user?.plan} plan`, icon: "🎫", bgColor: "#fffbeb", color: "#d97706" },
        { label: "Plan Limit", value: planFeatures.maxCertsPerMonth === "Unlimited" ? "∞" : `${planFeatures.maxCertsPerMonth}/mo`, change: "Upgrade for more", icon: "📊", bgColor: "#f5f3ff", color: "#7c3aed" },
      ]
    }
  }

  const stats = getRoleBasedStats()

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, marginBottom: 4 }}>
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h2>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              Role: <strong style={{ color: "#2563eb", textTransform: "capitalize" }}>{user?.role?.replace("_", " ")}</strong> • 
              Plan: <strong style={{ color: "#10b981" }}>{user?.plan}</strong>
            </p>
          </div>
          <div className="card" style={{ padding: "12px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Monthly Limit</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#2563eb" }}>
              {planFeatures.maxCertsPerMonth === "Unlimited" ? "∞" : `${CERTIFICATES.length}/${planFeatures.maxCertsPerMonth}`}
            </div>
            <div className="progress-bar" style={{ marginTop: 8, width: 150 }}>
              <div className="progress-fill" style={{ 
                width: planFeatures.maxCertsPerMonth === "Unlimited" ? "100%" : `${(CERTIFICATES.length / planFeatures.maxCertsPerMonth) * 100}%`,
                background: "#2563eb" 
              }} />
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid-2">
        <RecentCertificates certificates={CERTIFICATES.slice(0, 5)} />
        <div>
          {hasPermission("view_analytics") && (
            <>
              <AnalyticsChart data={ANALYTICS_DATA.monthly} />
              <TopCourses courses={ANALYTICS_DATA.topCourses.slice(0, 3)} />
            </>
          )}
          {!hasPermission("view_analytics") && (
            <div className="card" style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
              <h3 style={{ marginBottom: 8 }}>Analytics Not Available</h3>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 16 }}>
                Upgrade to {user?.plan === "Free" ? "Basic" : user?.plan === "Basic" ? "Pro" : "Business"} plan to access analytics
              </p>
              <Button variant="outline">Upgrade Plan</Button>
            </div>
          )}
        </div>
      </div>

      {/* Plan Features Section */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>
          {user?.plan} Plan Features
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {planFeatures.features.map(feature => (
            <div key={feature} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <span style={{ color: "#10b981" }}>✓</span> {feature}
            </div>
          ))}
        </div>
        {user?.plan !== "Enterprise" && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
            <Button variant="outline" size="sm">Upgrade to Next Plan →</Button>
          </div>
        )}
      </div>
    </div>
  )
}
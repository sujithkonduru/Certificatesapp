// src/components/layout/Sidebar.jsx
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

export function Sidebar({ navItems, managementItems, activePage, onPageChange }) {
  const { user, hasPermission, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Filter navigation based on permissions
  const getFilteredNavItems = () => {
    const role = user?.role
    
    if (role === "super_admin") {
      return [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "organizations", label: "Organizations", icon: "🏢" },
        { id: "certificates", label: "Certificates", icon: "🏆" },
        { id: "templates", label: "Templates", icon: "📄" },
        { id: "users", label: "Users", icon: "👥" },
        { id: "analytics", label: "Analytics", icon: "📊" },
        { id: "system", label: "System Settings", icon: "⚙️" },
      ]
    } else if (role === "admin") {
      return [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "certificates", label: "Certificates", icon: "🏆" },
        { id: "templates", label: "Templates", icon: "📄" },
        { id: "bulk", label: "Bulk Generate", icon: "⚡" },
        { id: "recipients", label: "Recipients", icon: "👥" },
        { id: "team", label: "Team", icon: "👤" },
        { id: "analytics", label: "Analytics", icon: "📊" },
      ]
    } else if (role === "manager") {
      return [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "certificates", label: "Certificates", icon: "🏆" },
        { id: "templates", label: "Templates", icon: "📄" },
        { id: "bulk", label: "Bulk Generate", icon: "⚡" },
        { id: "recipients", label: "Recipients", icon: "👥" },
        { id: "analytics", label: "Analytics", icon: "📊" },
      ]
    } else if (role === "editor") {
      return [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "certificates", label: "Certificates", icon: "🏆" },
        { id: "templates", label: "Templates", icon: "📄" },
        { id: "recipients", label: "Recipients", icon: "👥" },
      ]
    } else if (role === "viewer") {
      return [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "certificates", label: "Certificates", icon: "🏆" },
      ]
    } else {
      return [
        { id: "dashboard", label: "Dashboard", icon: "🏠" },
        { id: "certificates", label: "Certificates", icon: "🏆" },
        { id: "templates", label: "Templates", icon: "📄" },
        { id: "recipients", label: "Recipients", icon: "👥" },
      ]
    }
  }

  const getFilteredManagementItems = () => {
    const role = user?.role
    
    if (role === "super_admin" || role === "admin") {
      return [
        { id: "organization", label: "Organization", icon: "🏢" },
        { id: "team", label: "Team", icon: "👤" },
        { id: "billing", label: "Billing", icon: "💳" },
        { id: "settings", label: "Settings", icon: "⚙️" },
      ]
    } else if (role === "manager") {
      return [
        { id: "organization", label: "Organization", icon: "🏢" },
        { id: "team", label: "Team", icon: "👤" },
        { id: "settings", label: "Settings", icon: "⚙️" },
      ]
    } else {
      return [
        { id: "settings", label: "Settings", icon: "⚙️" },
      ]
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/" // Redirect to home page
  }

  const filteredNav = getFilteredNavItems()
  const filteredManagement = getFilteredManagementItems()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>C</span>
        </div>
        <span className="logo-text">CertFlow</span>
      </div>
      
      <div style={{ padding: "12px 20px" }}>
        <div style={{ 
          background: "#1f2937", 
          borderRadius: 8, 
          padding: 8,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>Current Plan</div>
          <div style={{ fontWeight: 700, color: "#10b981", fontSize: 14 }}>{user?.plan}</div>
          <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{user?.role?.replace("_", " ")}</div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          {filteredNav.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onPageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        
        {filteredManagement.length > 0 && (
          <div className="nav-section">
            <div className="nav-label">Management</div>
            {filteredManagement.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
      
      {/* User Profile Section with Dropdown */}
      <div className="sidebar-user">
        <div 
          className="user-card" 
          onClick={() => setShowUserMenu(!showUserMenu)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.name}
            </div>
            <div style={{ color: "#6b7280", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>▼</div>
        </div>
        
        {/* Dropdown Menu */}
        {showUserMenu && (
          <>
            <div 
              className="user-menu-overlay"
              onClick={() => setShowUserMenu(false)}
            />
            <div className="user-menu">
              <div className="user-menu-header">
                <div className="user-menu-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="user-menu-info">
                  <div className="user-menu-name">{user?.name}</div>
                  <div className="user-menu-email">{user?.email}</div>
                </div>
              </div>
              
              <div className="user-menu-divider" />
              
              <button 
                className="user-menu-item"
                onClick={() => {
                  setShowUserMenu(false)
                  onPageChange("profile")
                }}
              >
                <span className="user-menu-icon">👤</span>
                <span>My Profile</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => {
                  setShowUserMenu(false)
                  onPageChange("settings")
                }}
              >
                <span className="user-menu-icon">⚙️</span>
                <span>Settings</span>
              </button>
              
              <button 
                className="user-menu-item"
                onClick={() => {
                  setShowUserMenu(false)
                  onPageChange("billing")
                }}
              >
                <span className="user-menu-icon">💰</span>
                <span>Billing</span>
              </button>
              
              <div className="user-menu-divider" />
              
              <button 
                className="user-menu-item user-menu-logout"
                onClick={handleLogout}
              >
                <span className="user-menu-icon">🚪</span>
                <span>Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .sidebar-user {
          position: relative;
          padding: 12px;
          border-top: 1px solid #1f2937;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #1f2937;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .user-card:hover {
          background: #374151;
        }

        .user-menu-overlay {
          position: fixed;
          bottom: 80px;
          left: 0;
          right: 0;
          top: 0;
          z-index: 999;
        }

        .user-menu {
          position: absolute;
          bottom: 100%;
          left: 12px;
          right: 12px;
          background: #1f2937;
          border-radius: 12px;
          margin-bottom: 8px;
          overflow: hidden;
          z-index: 1000;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          animation: slideUp 0.2s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-menu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #374151;
        }

        .user-menu-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .user-menu-info {
          flex: 1;
        }

        .user-menu-name {
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }

        .user-menu-email {
          font-size: 11px;
          color: #9ca3af;
        }

        .user-menu-divider {
          height: 1px;
          background: #374151;
          margin: 8px 0;
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          color: #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          text-align: left;
        }

        .user-menu-item:hover {
          background: #374151;
        }

        .user-menu-logout {
          color: #ef4444;
        }

        .user-menu-logout:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .user-menu-icon {
          font-size: 18px;
          width: 24px;
        }
      `}</style>
    </aside>
  )
}
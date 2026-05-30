import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/AuthContext"

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", iconActive: "🏠" },
  { id: "certificates", label: "Certificates", icon: "🏆", iconActive: "🏆" },
  { id: "templates", label: "Templates", icon: "📄", iconActive: "📄" },
  { id: "bulk", label: "Bulk Generate", icon: "⚡", iconActive: "⚡" },
  { id: "recipients", label: "Recipients", icon: "👥", iconActive: "👥" },
  { id: "verification", label: "Verification", icon: "🔍", iconActive: "🔍" },
  { id: "emails", label: "Email Logs", icon: "✉️", iconActive: "✉️" },
  { id: "analytics", label: "Analytics", icon: "📊", iconActive: "📊" },
]

const MANAGEMENT_ITEMS = [
  { id: "organization", label: "Organization", icon: "🏢", iconActive: "🏢" },
  { id: "team", label: "Team", icon: "👤", iconActive: "👤" },
  { id: "billing", label: "Billing", icon: "💳", iconActive: "💳" },
  { id: "settings", label: "Settings", icon: "⚙️", iconActive: "⚙️" },
]

// Sidebar Component
function Sidebar({ navItems, managementItems, activePage, onPageChange, sidebarCollapsed, onToggleCollapse }) {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>C</span>
          </div>
          {!sidebarCollapsed && <span className="logo-text">CertFlow</span>}
        </div>
        <button className="sidebar-toggle" onClick={onToggleCollapse}>
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </div>
      
      {!sidebarCollapsed && (
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
      )}
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => onPageChange(item.id)}
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}
        </div>
        
        {managementItems.length > 0 && !sidebarCollapsed && (
          <div className="nav-section">
            <div className="nav-label">Management</div>
            {managementItems.map(item => (
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
      
      <div className="sidebar-footer">
        <div className="user-card" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          {!sidebarCollapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.name}
              </div>
              <div style={{ color: "#6b7280", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.email}
              </div>
            </div>
          )}
          {!sidebarCollapsed && <div style={{ fontSize: 12, color: "#6b7280" }}>▼</div>}
        </div>
        
        {showUserMenu && !sidebarCollapsed && (
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
            <button className="user-menu-item" onClick={() => onPageChange("profile")}>
              <span className="user-menu-icon">👤</span>
              <span>My Profile</span>
            </button>
            <button className="user-menu-item" onClick={() => onPageChange("settings")}>
              <span className="user-menu-icon">⚙️</span>
              <span>Settings</span>
            </button>
            <button className="user-menu-item" onClick={() => onPageChange("billing")}>
              <span className="user-menu-icon">💰</span>
              <span>Billing</span>
            </button>
            <div className="user-menu-divider" />
            <button className="user-menu-item user-menu-logout" onClick={handleLogout}>
              <span className="user-menu-icon">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

// TopBar Component
function TopBar({ title, user, onToggleSidebar, onToggleNotifications, onToggleSearch, unreadCount, onLogout, onThemeToggle }) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onToggleSidebar}>
          ☰
        </button>
        <span className="topbar-title">{title}</span>
      </div>
      
      <div className="topbar-right">
        <button className="topbar-icon-btn" onClick={onToggleSearch}>
          🔍
        </button>
        
        <button className="topbar-icon-btn" onClick={onThemeToggle}>
          🌓
        </button>
        
        <button className="topbar-icon-btn notification-btn" onClick={onToggleNotifications}>
          🔔
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
        
        <div className="topbar-user" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="topbar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="topbar-user-name">{user?.name}</span>
          <span className="topbar-user-arrow">▼</span>
        </div>
        
        {showUserMenu && (
          <>
            <div className="topbar-menu-overlay" onClick={() => setShowUserMenu(false)} />
            <div className="topbar-user-menu">
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
              <button className="user-menu-item" onClick={() => setShowUserMenu(false)}>👤 Profile</button>
              <button className="user-menu-item" onClick={() => setShowUserMenu(false)}>⚙️ Settings</button>
              <button className="user-menu-item" onClick={() => setShowUserMenu(false)}>💰 Billing</button>
              <div className="user-menu-divider" />
              <button className="user-menu-item user-menu-logout" onClick={onLogout}>
                🚪 Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Main DashboardLayout Component
export function DashboardLayout({ children, activePage, onPageChange }) {
  const { user, logout } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Certificate Generated", message: "50 certificates were generated successfully", time: "2 min ago", read: false, type: "success" },
    { id: 2, title: "New Template Created", message: "Modern Blue template was created", time: "1 hour ago", read: false, type: "info" },
    { id: 3, title: "Payment Received", message: "$49.00 payment received", time: "3 hours ago", read: true, type: "success" },
    { id: 4, title: "Team Member Joined", message: "John Smith joined your organization", time: "1 day ago", read: true, type: "info" },
  ])
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const allPages = [...NAV_ITEMS, ...MANAGEMENT_ITEMS]
    if (searchQuery.trim()) {
      const results = allPages.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const pageTitles = {
    dashboard: "Dashboard",
    certificates: "Certificates",
    templates: "Templates",
    bulk: "Bulk Generate",
    recipients: "Recipients",
    verification: "Verification",
    emails: "Email Logs",
    analytics: "Analytics",
    organization: "Organization",
    team: "Team",
    billing: "Billing",
    settings: "Settings"
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleSearchResultClick = (pageId) => {
    onPageChange(pageId)
    setShowSearch(false)
    setSearchQuery("")
  }

  const toggleTheme = () => {
    document.body.classList.toggle("dark-theme")
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light")
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className={`app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        navItems={NAV_ITEMS}
        managementItems={MANAGEMENT_ITEMS}
        activePage={activePage}
        onPageChange={onPageChange}
        sidebarCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="main">
        <TopBar 
          title={pageTitles[activePage]} 
          user={user}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          onToggleSearch={() => setShowSearch(!showSearch)}
          unreadCount={unreadCount}
          onLogout={handleLogout}
          onThemeToggle={toggleTheme}
        />
        
        <div className="content-wrapper">
          {/* Search Modal */}
          {showSearch && (
            <div className="search-modal" ref={searchRef}>
              <div className="search-header">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search pages, settings, or actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="search-close" onClick={() => setShowSearch(false)}>✕</button>
              </div>
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map(result => (
                    <div
                      key={result.id}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(result.id)}
                    >
                      <span className="result-icon">{result.icon}</span>
                      <div>
                        <div className="result-title">{result.label}</div>
                        <div className="result-path">Navigation</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <div className="search-no-results">
                  <span>🔍</span>
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
          
          {/* Notifications Panel */}
          {showNotifications && (
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button className="mark-all-read" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              </div>
              <div className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`notification-item ${!notif.read ? "unread" : ""}`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className={`notification-icon ${notif.type}`}>
                        {notif.type === "success" ? "✅" : "ℹ️"}
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notif.title}</div>
                        <div className="notification-message">{notif.message}</div>
                        <div className="notification-time">{notif.time}</div>
                      </div>
                      {!notif.read && <div className="notification-dot" />}
                    </div>
                  ))
                ) : (
                  <div className="no-notifications">
                    <span>🔔</span>
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="content">{children}</div>
        </div>
      </div>

      <style>{`
        .app {
          display: flex;
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .app.sidebar-collapsed .sidebar {
          width: 80px;
        }

        .app.sidebar-collapsed .sidebar-logo span,
        .app.sidebar-collapsed .nav-item span:not(.nav-icon),
        .app.sidebar-collapsed .nav-label,
        .app.sidebar-collapsed .user-card > div:not(.avatar) {
          display: none;
        }

        .app.sidebar-collapsed .nav-item {
          justify-content: center;
          padding: 12px;
        }

        .app.sidebar-collapsed .nav-icon {
          font-size: 20px;
        }

        .app.sidebar-collapsed .user-card {
          justify-content: center;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: #111827;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          position: relative;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #1f2937;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          background: #2563eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-text {
          font-family: 'Fraunces', serif;
          color: #fff;
          font-size: 18px;
          letter-spacing: -0.3px;
        }

        .sidebar-toggle {
          background: #1f2937;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 14px;
        }

        .sidebar-toggle:hover {
          background: #374151;
          color: #fff;
        }

        .sidebar-nav {
          flex: 1;
          padding: 12px 8px;
          overflow-y: auto;
        }

        .nav-section {
          margin-bottom: 20px;
        }

        .nav-label {
          color: #4b5563;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 0 8px;
          margin-bottom: 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          color: #9ca3af;
          cursor: pointer;
          transition: all .15s;
          margin-bottom: 2px;
          font-size: 13px;
          font-weight: 500;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: #1f2937;
          color: #e5e7eb;
        }

        .nav-item.active {
          background: #1d4ed8;
          color: #fff;
        }

        .nav-icon {
          font-size: 15px;
          width: 16px;
          flex-shrink: 0;
        }

        .sidebar-footer {
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
          cursor: pointer;
          transition: background 0.2s;
        }

        .user-card:hover {
          background: #374151;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 13px;
          flex-shrink: 0;
        }

        .user-menu {
          position: absolute;
          bottom: 70px;
          left: 12px;
          right: 12px;
          background: #1f2937;
          border-radius: 12px;
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
          padding: 10px 16px;
          background: none;
          border: none;
          color: #e5e7eb;
          cursor: pointer;
          transition: background 0.2s;
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

        /* Main Content */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .topbar {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .topbar-menu-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .topbar-menu-btn:hover {
          background: #f3f4f6;
        }

        .topbar-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: #111;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .topbar-icon-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          position: relative;
          transition: background 0.2s;
        }

        .topbar-icon-btn:hover {
          background: #f3f4f6;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 10px;
          font-weight: 600;
        }

        .topbar-user {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .topbar-user:hover {
          background: #f3f4f6;
        }

        .topbar-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .topbar-user-name {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .topbar-user-arrow {
          font-size: 10px;
          color: #6b7280;
        }

        .topbar-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }

        .topbar-user-menu {
          position: absolute;
          top: 50px;
          right: 20px;
          width: 280px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          z-index: 1000;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-wrapper {
          flex: 1;
          overflow-y: auto;
          position: relative;
        }

        .content {
          padding: 24px;
          background: #f8f7f5;
          min-height: calc(100vh - 56px);
        }

        /* Search Modal */
        .search-modal {
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 1000;
          animation: slideDown 0.2s ease;
          overflow: hidden;
        }

        .search-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .search-icon {
          font-size: 20px;
          margin-right: 12px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          background: transparent;
        }

        .search-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #6b7280;
          padding: 4px 8px;
        }

        .search-results {
          max-height: 400px;
          overflow-y: auto;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .search-result-item:hover {
          background: #f3f4f6;
        }

        .result-icon {
          font-size: 20px;
        }

        .result-title {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .result-path {
          font-size: 11px;
          color: #6b7280;
        }

        .search-no-results {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .search-no-results span {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }

        /* Notifications Panel */
        .notifications-panel {
          position: fixed;
          top: 60px;
          right: 20px;
          width: 380px;
          max-width: calc(100vw - 40px);
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 1000;
          animation: slideRight 0.2s ease;
          overflow: hidden;
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .notifications-header h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 12px;
          cursor: pointer;
        }

        .notifications-list {
          max-height: 500px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background 0.2s;
          position: relative;
        }

        .notification-item:hover {
          background: #f9fafb;
        }

        .notification-item.unread {
          background: #eff6ff;
        }

        .notification-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .notification-icon.success {
          background: #d1fae5;
        }

        .notification-icon.info {
          background: #dbeafe;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .notification-message {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .notification-time {
          font-size: 11px;
          color: #9ca3af;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          background: #2563eb;
          border-radius: 50%;
          position: absolute;
          top: 20px;
          right: 16px;
        }

        .no-notifications {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .no-notifications span {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }

        /* Dark Theme */
        .dark-theme {
          background: #111827;
        }

        .dark-theme .content {
          background: #1f2937;
          color: #f3f4f6;
        }

        .dark-theme .topbar {
          background: #1f2937;
          border-bottom-color: #374151;
        }

        .dark-theme .topbar-title {
          color: #f3f4f6;
        }

        .dark-theme .topbar-icon-btn:hover,
        .dark-theme .topbar-user:hover,
        .dark-theme .topbar-menu-btn:hover {
          background: #374151;
        }

        .dark-theme .topbar-user-name {
          color: #f3f4f6;
        }

        .dark-theme .search-modal,
        .dark-theme .notifications-panel,
        .dark-theme .topbar-user-menu {
          background: #1f2937;
          color: #f3f4f6;
          border: 1px solid #374151;
        }

        .dark-theme .search-header,
        .dark-theme .notifications-header {
          background: #1f2937;
          border-bottom-color: #374151;
        }

        .dark-theme .search-input {
          color: #f3f4f6;
          background: transparent;
        }

        .dark-theme .search-result-item:hover {
          background: #374151;
        }

        .dark-theme .notification-item {
          border-bottom-color: #374151;
        }

        .dark-theme .notification-item:hover {
          background: #374151;
        }

        .dark-theme .user-menu-header {
          background: #374151;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .notifications-panel {
            width: calc(100vw - 40px);
            right: 20px;
            left: 20px;
          }
          
          .search-modal {
            width: calc(100vw - 40px);
          }

          .topbar-user-name,
          .topbar-user-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
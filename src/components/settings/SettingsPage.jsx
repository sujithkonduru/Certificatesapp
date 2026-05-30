import { useState } from "react"
import { Button } from "../common/Button"
// import { Input } from "../common/Input"
import { useAuth } from "../../context/AuthContext"

export function SettingsPage({ user }) {
  const {} = useAuth()
  const [tab, setTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  
  // Profile state
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    jobTitle: "Training Director",
    phone: "+91 98765 43210",
    bio: "Passionate about creating impactful learning experiences.",
    location: "Mumbai, India",
    timezone: "Asia/Kolkata",
    language: "English"
  })

  // Security state
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    backupCodes: ["XXXX-XXXX-XXXX", "YYYY-YYYY-YYYY", "ZZZZ-ZZZZ-ZZZZ"]
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    certificateDelivered: true,
    bulkJobComplete: true,
    paymentFailed: true,
    teamInvites: true,
    marketingEmails: false,
    weeklyDigest: true,
    browserNotifications: true
  })

  // Appearance preferences
  const [appearance, setAppearance] = useState({
    theme: "dark",
    accentColor: "#2563eb",
    fontSize: "medium",
    compactMode: false,
    animationLevel: "normal",
    sidebarCollapsed: false
  })

  // API Keys
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Key", key: "sk_live_••••••••••••••••", created: "2024-01-15", lastUsed: "2025-05-16", active: true },
    { id: 2, name: "Development Key", key: "sk_test_••••••••••••••••", created: "2024-03-20", lastUsed: "2025-05-15", active: true }
  ])

  // Connected apps
  const [connectedApps] = useState([
    { id: 1, name: "Slack", icon: "💬", connected: true, email: "workspace@certflow.com" },
    { id: 2, name: "Google Drive", icon: "📁", connected: true, email: "backup@certflow.com" },
    { id: 3, name: "Zapier", icon: "⚡", connected: false },
    { id: 4, name: "Salesforce", icon: "📊", connected: false }
  ])

  // Billing info
  const [billingInfo, setBillingInfo] = useState({
    plan: user?.plan || "Pro",
    billingEmail: "billing@certflow.com",
    taxId: "GST123456789",
    address: "123 Business Street, Tech Park, Mumbai - 400001",
    nextBillingDate: "2025-06-01",
    paymentMethod: {
      type: "visa",
      last4: "4242",
      expiry: "12/27"
    }
  })

  // Activity log
  const [activityLog] = useState([
    { id: 1, action: "Logged in", details: "Successfully logged in from Chrome on Windows", ip: "192.168.1.1", time: "2025-05-16 10:30 AM" },
    { id: 2, action: "Changed password", details: "Password was updated successfully", ip: "192.168.1.1", time: "2025-05-15 3:45 PM" },
    { id: 3, action: "Generated certificate", details: "Generated 50 certificates in bulk", ip: "192.168.1.1", time: "2025-05-15 11:20 AM" },
    { id: 4, action: "Updated settings", details: "Changed notification preferences", ip: "192.168.1.1", time: "2025-05-14 9:15 AM" }
  ])

  const handleSave = (section, data) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage(`${section} saved successfully!`)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  const handleToggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleGenerateApiKey = () => {
    const newKey = {
      id: apiKeys.length + 1,
      name: `API Key ${apiKeys.length + 1}`,
      key: `sk_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      active: true
    }
    setApiKeys([...apiKeys, newKey])
    alert(`New API Key generated: ${newKey.key}\nSave this now as it won't be shown again!`)
  }

  const colors = [
    { name: "Blue", value: "#2563eb" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Pink", value: "#ec4899" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Indigo", value: "#6366f1" }
  ]

  const getTabContent = () => {
    switch(tab) {
      case "profile": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Profile Information</h2>
            <p>Update your personal details and preferences</p>
          </div>

          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {user?.name?.charAt(0)}
            </div>
            <div className="profile-avatar-actions">
              <Button size="sm">Change Avatar</Button>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                className="settings-input"
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                className="settings-input"
                type="email"
                value={profile.email}
                onChange={e => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input 
                className="settings-input"
                value={profile.jobTitle}
                onChange={e => setProfile({...profile, jobTitle: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                className="settings-input"
                value={profile.phone}
                onChange={e => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            <div className="form-group full-width">
              <label>Bio</label>
              <textarea 
                className="settings-textarea"
                rows="3"
                value={profile.bio}
                onChange={e => setProfile({...profile, bio: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                className="settings-input"
                value={profile.location}
                onChange={e => setProfile({...profile, location: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Time Zone</label>
              <select 
                className="settings-select"
                value={profile.timezone}
                onChange={e => setProfile({...profile, timezone: e.target.value})}
              >
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
                <option>Asia/Tokyo (JST)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Language</label>
              <select 
                className="settings-select"
                value={profile.language}
                onChange={e => setProfile({...profile, language: e.target.value})}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
              </select>
            </div>
          </div>

          <div className="settings-card-actions">
            <Button variant="outline">Cancel</Button>
            <Button onClick={() => handleSave("Profile", profile)} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )

      case "security": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Security Settings</h2>
            <p>Manage your password and security preferences</p>
          </div>

          <div className="security-section">
            <h3>Change Password</h3>
            <div className="settings-form-grid">
              <div className="form-group full-width">
                <label>Current Password</label>
                <input 
                  className="settings-input"
                  type="password"
                  placeholder="Enter current password"
                  value={security.currentPassword}
                  onChange={e => setSecurity({...security, currentPassword: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input 
                  className="settings-input"
                  type="password"
                  placeholder="Enter new password"
                  value={security.newPassword}
                  onChange={e => setSecurity({...security, newPassword: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  className="settings-input"
                  type="password"
                  placeholder="Confirm new password"
                  value={security.confirmPassword}
                  onChange={e => setSecurity({...security, confirmPassword: e.target.value})}
                />
              </div>
            </div>
            <div className="password-requirements">
              <div>✓ At least 8 characters</div>
              <div>✓ Contains uppercase & lowercase</div>
              <div>✓ Contains a number</div>
              <div>✓ Contains a special character</div>
            </div>
            <Button style={{ marginTop: 16 }}>Update Password</Button>
          </div>

          <div className="security-section">
            <h3>Two-Factor Authentication</h3>
            <div className="two-factor-status">
              <div className="status-info">
                <div className="status-badge">⚠️ Not Enabled</div>
                <p>Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </div>

          <div className="security-section">
            <h3>Session Management</h3>
            <div className="session-item">
              <div>
                <div className="session-device">Chrome on Windows</div>
                <div className="session-location">Mumbai, India</div>
                <div className="session-time">Last active: 2 minutes ago</div>
              </div>
              <Button variant="danger" size="sm">Revoke</Button>
            </div>
            <div className="session-item">
              <div>
                <div className="session-device">Safari on iPhone</div>
                <div className="session-location">Mumbai, India</div>
                <div className="session-time">Last active: 3 hours ago</div>
              </div>
              <Button variant="danger" size="sm">Revoke</Button>
            </div>
          </div>
        </div>
      )

      case "notifications": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Notification Preferences</h2>
            <p>Choose what notifications you want to receive</p>
          </div>

          <div className="notifications-list">
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-icon">📧</span>
                <div>
                  <h4>Email Notifications</h4>
                  <p>Receive updates via email</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.emailNotifications}
                  onChange={() => handleToggleNotification("emailNotifications")}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-icon">🏆</span>
                <div>
                  <h4>Certificate Delivered</h4>
                  <p>When a certificate is successfully delivered</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.certificateDelivered}
                  onChange={() => handleToggleNotification("certificateDelivered")}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-icon">⚡</span>
                <div>
                  <h4>Bulk Job Complete</h4>
                  <p>When bulk certificate generation completes</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.bulkJobComplete}
                  onChange={() => handleToggleNotification("bulkJobComplete")}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-icon">💳</span>
                <div>
                  <h4>Payment Failed</h4>
                  <p>When a payment fails</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.paymentFailed}
                  onChange={() => handleToggleNotification("paymentFailed")}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-icon">👥</span>
                <div>
                  <h4>Team Invites</h4>
                  <p>When someone joins your team</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.teamInvites}
                  onChange={() => handleToggleNotification("teamInvites")}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-icon">📊</span>
                <div>
                  <h4>Weekly Digest</h4>
                  <p>Weekly summary of your activity</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={notifications.weeklyDigest}
                  onChange={() => handleToggleNotification("weeklyDigest")}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="settings-card-actions">
            <Button onClick={() => handleSave("Notification", notifications)}>
              Save Preferences
            </Button>
          </div>
        </div>
      )

      case "appearance": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Appearance Settings</h2>
            <p>Customize how CertFlow looks for you</p>
          </div>

          <div className="appearance-section">
            <h3>Theme</h3>
            <div className="theme-options">
              <div 
                className={`theme-option ${appearance.theme === "light" ? "active" : ""}`}
                onClick={() => setAppearance({...appearance, theme: "light"})}
              >
                <div className="theme-preview light-preview"></div>
                <div>Light</div>
              </div>
              <div 
                className={`theme-option ${appearance.theme === "dark" ? "active" : ""}`}
                onClick={() => setAppearance({...appearance, theme: "dark"})}
              >
                <div className="theme-preview dark-preview"></div>
                <div>Dark</div>
              </div>
              <div 
                className={`theme-option ${appearance.theme === "system" ? "active" : ""}`}
                onClick={() => setAppearance({...appearance, theme: "system"})}
              >
                <div className="theme-preview system-preview"></div>
                <div>System</div>
              </div>
            </div>
          </div>

          <div className="appearance-section">
            <h3>Accent Color</h3>
            <div className="color-options">
              {colors.map(color => (
                <div 
                  key={color.value}
                  className={`color-option ${appearance.accentColor === color.value ? "active" : ""}`}
                  style={{ background: color.value }}
                  onClick={() => setAppearance({...appearance, accentColor: color.value})}
                />
              ))}
            </div>
          </div>

          <div className="appearance-section">
            <h3>Font Size</h3>
            <div className="font-size-options">
              {["small", "medium", "large", "extra large"].map(size => (
                <div 
                  key={size}
                  className={`font-option ${appearance.fontSize === size ? "active" : ""}`}
                  onClick={() => setAppearance({...appearance, fontSize: size})}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div className="appearance-section">
            <div className="checkbox-option">
              <label className="checkbox-container">
                <input 
                  type="checkbox"
                  checked={appearance.compactMode}
                  onChange={(e) => setAppearance({...appearance, compactMode: e.target.checked})}
                />
                <span className="checkmark"></span>
                <span>Compact Mode - Reduce spacing and show more content</span>
              </label>
            </div>
          </div>

          <div className="settings-card-actions">
            <Button onClick={() => handleSave("Appearance", appearance)}>
              Apply Changes
            </Button>
          </div>
        </div>
      )

      case "api": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>API Keys</h2>
            <p>Manage your API keys for programmatic access</p>
          </div>

          <div className="api-keys-header">
            <Button onClick={handleGenerateApiKey}>+ Generate New API Key</Button>
          </div>

          <div className="api-keys-list">
            {apiKeys.map(key => (
              <div key={key.id} className="api-key-item">
                <div className="api-key-info">
                  <div className="api-key-name">{key.name}</div>
                  <div className="api-key-details">
                    <span>Created: {key.created}</span>
                    <span>Last used: {key.lastUsed}</span>
                  </div>
                  <code className="api-key-value">{key.key}</code>
                </div>
                <div className="api-key-actions">
                  <Button variant="outline" size="sm">Copy</Button>
                  <Button variant="danger" size="sm">Revoke</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="api-docs">
            <h4>API Documentation</h4>
            <p>Learn how to integrate CertFlow API into your application</p>
            <Button variant="outline" size="sm">View Documentation →</Button>
          </div>
        </div>
      )

      case "integrations": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Connected Apps</h2>
            <p>Connect your favorite tools and services</p>
          </div>

          <div className="integrations-list">
            {connectedApps.map(app => (
              <div key={app.id} className="integration-item">
                <div className="integration-icon">{app.icon}</div>
                <div className="integration-info">
                  <h4>{app.name}</h4>
                  {app.connected && <p>Connected as {app.email}</p>}
                  {!app.connected && <p>Not connected</p>}
                </div>
                <Button 
                  variant={app.connected ? "danger" : "outline"} 
                  size="sm"
                >
                  {app.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )

      case "billing": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Billing & Subscription</h2>
            <p>Manage your plan and payment methods</p>
          </div>

          <div className="current-plan">
            <div className="plan-details">
              <h3>{billingInfo.plan} Plan</h3>
              <p>Billed monthly • Next billing date: {billingInfo.nextBillingDate}</p>
              <Button variant="outline">Change Plan</Button>
            </div>
            <div className="plan-price">
              <div className="price-amount">$49</div>
              <div className="price-period">/month</div>
            </div>
          </div>

          <div className="billing-section">
            <h3>Payment Method</h3>
            <div className="payment-method">
              <div className="payment-card">
                <span className="card-icon">💳</span>
                <div>
                  <div>•••• •••• •••• {billingInfo.paymentMethod.last4}</div>
                  <div>Expires {billingInfo.paymentMethod.expiry}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>

          <div className="billing-section">
            <h3>Billing Address</h3>
            <textarea 
              className="settings-textarea"
              rows="3"
              value={billingInfo.address}
              onChange={e => setBillingInfo({...billingInfo, address: e.target.value})}
            />
          </div>

          <div className="billing-section">
            <h3>Invoice History</h3>
            <div className="invoices-list">
              {[1,2,3].map(i => (
                <div key={i} className="invoice-item">
                  <div>
                    <div>Invoice #INV-2025-00{i}</div>
                    <div>May 1, 2025</div>
                  </div>
                  <div>$49.00</div>
                  <Button variant="outline" size="sm">Download PDF</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

      case "activity": return (
        <div className="settings-card fade-in">
          <div className="settings-card-header">
            <h2>Recent Activity</h2>
            <p>Track your recent actions and login history</p>
          </div>

          <div className="activity-list">
            {activityLog.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">📌</div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-details">{activity.details}</div>
                  <div className="activity-meta">
                    <span>🌐 {activity.ip}</span>
                    <span>🕐 {activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="settings-card-actions">
            <Button variant="outline">Download All Logs</Button>
          </div>
        </div>
      )

      default: return null
    }
  }

  return (
    <div className="settings-container">
      {showSuccess && (
        <div className="settings-toast">
          ✅ {successMessage}
        </div>
      )}

      <div className="settings-header">
        <div>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account settings and preferences</p>
        </div>
        <div className="settings-plan-badge">
          <span className="plan-icon">⭐</span>
          <div>
            <div className="plan-name">{billingInfo.plan} Plan</div>
            <div className="plan-renewal">Renews on {billingInfo.nextBillingDate}</div>
          </div>
        </div>
      </div>

      <div className="settings-sidebar-layout">
        <div className="settings-sidebar">
          {[
            { id: "profile", icon: "👤", label: "Profile", description: "Your personal information" },
            { id: "security", icon: "🔒", label: "Security", description: "Password & 2FA" },
            { id: "notifications", icon: "🔔", label: "Notifications", description: "Alert preferences" },
            { id: "appearance", icon: "🎨", label: "Appearance", description: "Theme & layout" },
            { id: "api", icon: "🔑", label: "API Keys", description: "Manage API access" },
            { id: "integrations", icon: "🔌", label: "Integrations", description: "Connected apps" },
            { id: "billing", icon: "💰", label: "Billing", description: "Plan & payments" },
            { id: "activity", icon: "📊", label: "Activity", description: "Recent actions" }
          ].map(item => (
            <div
              key={item.id}
              className={`settings-nav-item ${tab === item.id ? "active" : ""}`}
              onClick={() => setTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <div className="nav-content">
                <div className="nav-label">{item.label}</div>
                <div className="nav-description">{item.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="settings-content">
          {getTabContent()}
        </div>
      </div>

      <style>{`
        .settings-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .settings-title {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #111;
        }

        .settings-subtitle {
          color: #6b7280;
          font-size: 14px;
        }

        .settings-plan-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 12px 20px;
          border-radius: 12px;
          color: white;
        }

        .plan-icon {
          font-size: 24px;
        }

        .plan-name {
          font-weight: 700;
          font-size: 14px;
        }

        .plan-renewal {
          font-size: 11px;
          opacity: 0.8;
        }

        .settings-sidebar-layout {
          display: flex;
          gap: 32px;
          min-height: 600px;
        }

        .settings-sidebar {
          width: 260px;
          flex-shrink: 0;
        }

        .settings-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 4px;
        }

        .settings-nav-item:hover {
          background: #f3f4f6;
        }

        .settings-nav-item.active {
          background: #eff6ff;
          color: #2563eb;
        }

        .settings-nav-item .nav-icon {
          font-size: 20px;
        }

        .nav-content {
          flex: 1;
        }

        .nav-label {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .nav-description {
          font-size: 11px;
          color: #6b7280;
        }

        .settings-content {
          flex: 1;
        }

        .settings-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .settings-card-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .settings-card-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .settings-card-header p {
          font-size: 13px;
          color: #6b7280;
        }

        .settings-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .settings-input,
        .settings-select,
        .settings-textarea {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .settings-input:focus,
        .settings-select:focus,
        .settings-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }

        .settings-textarea {
          resize: vertical;
        }

        .settings-card-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .profile-avatar-section {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .profile-avatar-large {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .security-section {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .security-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .password-requirements {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #10b981;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .two-factor-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #fef3c7;
          color: #d97706;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .session-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f9fafb;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .session-device {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .session-location,
        .session-time {
          font-size: 12px;
          color: #6b7280;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .notification-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .notification-icon {
          font-size: 24px;
        }

        .notification-info h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .notification-info p {
          font-size: 12px;
          color: #6b7280;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.3s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
        }

        input:checked + .slider {
          background-color: #2563eb;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        .appearance-section {
          margin-bottom: 32px;
        }

        .appearance-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .theme-options {
          display: flex;
          gap: 20px;
        }

        .theme-option {
          text-align: center;
          cursor: pointer;
        }

        .theme-preview {
          width: 80px;
          height: 60px;
          border-radius: 8px;
          margin-bottom: 8px;
          border: 2px solid transparent;
        }

        .theme-option.active .theme-preview {
          border-color: #2563eb;
        }

        .light-preview {
          background: white;
          border: 1px solid #e5e7eb;
        }

        .dark-preview {
          background: #1f2937;
        }

        .system-preview {
          background: linear-gradient(135deg, white 50%, #1f2937 50%);
        }

        .color-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-option {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid transparent;
        }

        .color-option.active {
          border-color: #fff;
          box-shadow: 0 0 0 2px #2563eb;
        }

        .font-size-options {
          display: flex;
          gap: 12px;
        }

        .font-option {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
        }

        .font-option.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .checkbox-option {
          margin-bottom: 12px;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 14px;
        }

        .api-keys-header {
          margin-bottom: 20px;
        }

        .api-key-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f9fafb;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .api-key-name {
          font-weight: 600;
          margin-bottom: 6px;
        }

        .api-key-details {
          display: flex;
          gap: 16px;
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .api-key-value {
          font-size: 12px;
          font-family: monospace;
          background: #e5e7eb;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .api-key-actions {
          display: flex;
          gap: 8px;
        }

        .api-docs {
          margin-top: 24px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
        }

        .api-docs h4 {
          margin-bottom: 8px;
        }

        .api-docs p {
          font-size: 13px;
          margin-bottom: 12px;
          opacity: 0.9;
        }

        .integrations-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .integration-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .integration-icon {
          font-size: 32px;
        }

        .integration-info {
          flex: 1;
        }

        .integration-info h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .integration-info p {
          font-size: 12px;
          color: #6b7280;
        }

        .current-plan {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
          margin-bottom: 24px;
        }

        .plan-details h3 {
          font-size: 18px;
          margin-bottom: 4px;
        }

        .plan-details p {
          font-size: 12px;
          opacity: 0.9;
          margin-bottom: 12px;
        }

        .plan-price {
          text-align: right;
        }

        .price-amount {
          font-size: 28px;
          font-weight: 700;
        }

        .price-period {
          font-size: 12px;
          opacity: 0.8;
        }

        .billing-section {
          margin-bottom: 24px;
        }

        .billing-section h3 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .payment-method {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .payment-card {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-icon {
          font-size: 32px;
        }

        .invoices-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .invoice-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .activity-icon {
          font-size: 20px;
        }

        .activity-content {
          flex: 1;
        }

        .activity-action {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .activity-details {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .activity-meta {
          display: flex;
          gap: 16px;
          font-size: 11px;
          color: #9ca3af;
        }

        .settings-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: fadeIn 0.3s ease-in-out;
        }

        @media (max-width: 768px) {
          .settings-sidebar-layout {
            flex-direction: column;
          }
          .settings-sidebar {
            width: 100%;
          }
          .settings-form-grid {
            grid-template-columns: 1fr;
          }
          .form-group.full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  )
}
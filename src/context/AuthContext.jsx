// src/context/AuthContext.jsx
import { useState, createContext, useContext, useCallback } from "react"

const AuthContext = createContext(null)

const DEMO_USERS = {
  // Super Admin - Full access
  "superadmin@certflow.com": { 
    password: "super123", 
    user: { 
      id: "1", 
      email: "superadmin@certflow.com", 
      name: "Super Admin", 
      role: "super_admin", 
      organizationName: "CertFlow Inc", 
      plan: "Enterprise",
      permissions: ["all"]
    } 
  },
  
  // Admin - Manage everything in their org
  "admin@certflow.com": { 
    password: "admin123", 
    user: { 
      id: "2", 
      email: "admin@certflow.com", 
      name: "Admin User", 
      role: "admin", 
      organizationName: "CertFlow Inc", 
      plan: "Enterprise",
      permissions: ["manage_users", "manage_templates", "view_analytics", "manage_billing"]
    } 
  },
  
  // Manager - Can create and manage certificates
  "manager@certflow.com": { 
    password: "manager123", 
    user: { 
      id: "3", 
      email: "manager@certflow.com", 
      name: "Manager User", 
      role: "manager", 
      organizationName: "CertFlow Inc", 
      plan: "Business",
      permissions: ["create_certificates", "manage_templates", "view_analytics"]
    } 
  },
  
  // Editor - Can create and edit certificates
  "editor@certflow.com": { 
    password: "editor123", 
    user: { 
      id: "4", 
      email: "editor@certflow.com", 
      name: "Editor User", 
      role: "editor", 
      organizationName: "CertFlow Inc", 
      plan: "Pro",
      permissions: ["create_certificates", "edit_certificates"]
    } 
  },
  
  // Viewer - Can only view certificates
  "viewer@certflow.com": { 
    password: "viewer123", 
    user: { 
      id: "5", 
      email: "viewer@certflow.com", 
      name: "Viewer User", 
      role: "viewer", 
      organizationName: "CertFlow Inc", 
      plan: "Basic",
      permissions: ["view_certificates"]
    } 
  },
  
  // Regular User - Basic access
  "demo@certflow.com": { 
    password: "demo123", 
    user: { 
      id: "6", 
      email: "demo@certflow.com", 
      name: "Demo User", 
      role: "user", 
      organizationName: "Demo Organization", 
      plan: "Free",
      permissions: ["view_certificates", "create_certificates"]
    } 
  },
  
  // Enterprise User - Full features
  "enterprise@certflow.com": { 
    password: "enterprise123", 
    user: { 
      id: "7", 
      email: "enterprise@certflow.com", 
      name: "Enterprise User", 
      role: "admin", 
      organizationName: "Tech Corp", 
      plan: "Enterprise",
      permissions: ["all"]
    } 
  },
  
  // Business User - Advanced features
  "business@certflow.com": { 
    password: "business123", 
    user: { 
      id: "8", 
      email: "business@certflow.com", 
      name: "Business User", 
      role: "manager", 
      organizationName: "Growth Inc", 
      plan: "Business",
      permissions: ["create_certificates", "manage_templates", "team_collaboration"]
    } 
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = useCallback(async (email, password) => {
    await new Promise(r => setTimeout(r, 800))
    const u = DEMO_USERS[email.toLowerCase()]
    if (!u) return { success: false, error: "User not found. Check demo credentials below" }
    if (u.password !== password) return { success: false, error: "Wrong password" }
    setUser(u.user)
    return { success: true, user: u.user }
  }, [])

  const register = useCallback(async (data) => {
    await new Promise(r => setTimeout(r, 1000))
    const newUser = { 
      id: `u_${Date.now()}`, 
      email: data.email, 
      name: data.name, 
      role: "user", 
      organizationName: data.org || `${data.name}'s Org`, 
      plan: data.plan || "Free",
      permissions: ["view_certificates", "create_certificates"]
    }
    setUser(newUser)
    return { success: true, user: newUser }
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const hasPermission = useCallback((permission) => {
    if (!user) return false
    if (user.permissions?.includes("all")) return true
    return user.permissions?.includes(permission) || false
  }, [user])

  const getPlanFeatures = useCallback((plan) => {
    const features = {
      "Free": {
        maxCertsPerMonth: 50,
        maxTemplates: 2,
        features: ["Email delivery", "QR verification", "Basic templates"]
      },
      "Basic": {
        maxCertsPerMonth: 100,
        maxTemplates: 5,
        features: ["Email delivery", "QR verification", "Basic templates", "Analytics"]
      },
      "Pro": {
        maxCertsPerMonth: 500,
        maxTemplates: "Unlimited",
        features: ["Email delivery", "QR verification", "Advanced templates", "Analytics", "API access", "Priority support"]
      },
      "Business": {
        maxCertsPerMonth: 2000,
        maxTemplates: "Unlimited",
        features: ["Email delivery", "QR verification", "Advanced templates", "Analytics", "API access", "Priority support", "Team collaboration", "White-label"]
      },
      "Enterprise": {
        maxCertsPerMonth: "Unlimited",
        maxTemplates: "Unlimited",
        features: ["Email delivery", "QR verification", "Advanced templates", "Advanced analytics", "Full API access", "24/7 support", "Team collaboration", "White-label", "Custom integrations", "SLA guarantee"]
      }
    }
    return features[plan] || features["Free"]
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      hasPermission,
      getPlanFeatures
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
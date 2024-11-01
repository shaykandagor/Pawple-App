export interface Session {
  authenticated: boolean
  sessionToken?: string
  user?: User
}

export interface User {
  id: string
  username: string
  fullName?: string
  email: string
  password: string
  isActive: boolean
  isAdmin: boolean
  photoUrl?: string
  socialSecurityNumber: string
  birthday?: string
  address?: string
  createdAt: string
  updatedAt: string
}

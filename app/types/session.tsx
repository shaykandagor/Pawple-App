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
  walker?: Walker
  owner?: Owner
  createdAt: string
  updatedAt: string
}

export interface Walker {
  id: string
  userId: string
  preferredSize: string
  createdAt: string
  updatedAt: string
}

export interface Owner {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
}

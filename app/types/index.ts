import { Route } from '@react-navigation/native'

export interface Pet {
  id: string
  name: string
  birthDay: string
  descriptions: string[]
  size: string
  sex: string
  type: string
  ownerId: string
  photoUrl: string
  createdAt: string
  updatedAt: string
}

export interface WalkDuration {
  id: string
  units: string
  duration: number
  cost: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  ownerId: string
  petId: string
  pickupAddress: PickupAddress
  durationId: string
  instructions: string
  visitPark: boolean
  bringDisposableBags: boolean
  status: string
  pickupTime: string
  createdAt: string
  updatedAt: string
  walks: Walk[]
  duration: WalkDuration
  pet: Pet
  owner: Owner
}

export interface PickupAddress {
  lat: number
  lng: number
  address: string
}

export interface Owner {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface Walker {
  id: string
  userId: string
  preferredSize: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  username: string
  fullName: string
  email: string
  password: string
  isActive: boolean
  isAdmin: boolean
  photoUrl: any
  socialSecurityNumber: string
  birthday: any
  address: any
  createdAt: string
  updatedAt: string
}

export interface Walk {
  id: string
  walkerId: string
  startTime: any
  endTime: any
  timeClaimed: string
  timeCanceled: any
  bookingId: string
  createdAt: string
  updatedAt: string
  booking: Booking
  walker: Walker
  duration: WalkDuration
  status?: 'In Progress' | 'Completed' | 'Canceled' | 'Claimed'
  routePoints?: RoutePoint[]
}

export interface RoutePoint {
  id: string
  latitude: string
  longitude: string
  walkId: string
  createdAt: string
}

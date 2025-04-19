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
  duration: WalkDuration
  owner: Owner
  pet: Pet
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
}


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

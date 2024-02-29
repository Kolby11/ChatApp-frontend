export namespace Types {
  export type UserPublic = {
    _id: string
    username: string
    email: string
    profileImageName: string
  }

  export type ChatPreview = {
    _id: string
    name: string
    userIds: UserPublic[]
  }
}

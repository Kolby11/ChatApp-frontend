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

  export type ChatDetail = {
    _id: string
    name: string
    userIds: UserPublic[]
    messages: Message[]
  }

  export type Message = {
    _id: string
    user: {
      _id: string
      username: string
    }
    message: string
  }
}

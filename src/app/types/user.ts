export interface UserInterface {
  id: number
  name: string
  email?: string
  desc?: string
  avatar?: string
}

export interface IUserSignIn {
  name: string
  password: string
}

export interface IUserSignUp {
  name: string
  email: string
  password: string
}
export interface IUserReset {
  email: string
}

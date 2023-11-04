import { IAuth } from "../types"

export interface ICredentials {
  code: string,
  password: string
}

export interface INewUser {
  name: string,
  email: string,
  password: string,
  gender: string,
  age: number
}

export interface AuthContextProps {
  auth: IAuth,
  login: (user: ICredentials) => Promise<string>,
  logout: () => void,
  signup: (user: INewUser) => Promise<string>,
  updateUser: (name: string, email: string, password: string) => Promise<void>,
}

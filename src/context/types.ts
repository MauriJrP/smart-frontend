import { IAuth, IPlanCreation, IPlace, IComment } from "../types"

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


export interface PlansContextProps {
  planCreation: IPlanCreation;
  addPlaces: () => void;
}

export interface PlaceContextProps {
  place: IPlace;
  comments: IComment[];
  loadPlace: (idPlace: string) => Promise<void>;
  createComment: (rating: number, comment: string, idUser: number, idPlace: number) => Promise<void>;
  deleteComment: (idComment: number, idPlace: number) => Promise<void>;
}
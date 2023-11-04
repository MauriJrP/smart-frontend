import axios from 'axios'
import { useReducer } from 'react'
import { IAuth, IUser } from '../../types'
import { ICredentials, INewUser } from '../types'
import {AuthContext} from './AuthContext'
import { AuthReducer } from './AuthReducer'
import { useCookies } from 'react-cookie'


interface IProps {
  children: JSX.Element | JSX.Element[]
}

const initialState: IAuth = {
  loggedIn: false,
}

export const AuthProvider = ({children}: IProps) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': '',
    }
  }

  const login = async(credentials: ICredentials) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login`;
      const body = {...credentials}

      const data = await (await axios.post(url, body, config)).data;
      // if (data.token) document.cookie = `token=${data.token}; max-age=${60*10}; path=/; samesite=strict`
      if (data.token) setCookie('token', data.token, {path: '/', maxAge: 60*10, sameSite: 'strict'})
      else return data.message;

      const currentUserUrl = `${process.env.REACT_APP_API_URL}/auth/getcurrentuser`;
      config.headers['Authorization'] = `Bearer ${data.token}`;
      const user_data = await (await axios.get(currentUserUrl, config)).data;
      console.log(user_data);
  
      const user: IUser = {
        ...user_data.user,
        ...credentials,
      }

      dispatch({type: 'login', payload: user})
      return "";
      
    } catch (err: any) {
      return(err.response.data.message);
    }
  }

  const logout = () => {
    dispatch({type: "logout"})
  }

  const signup = async(newUser: INewUser) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
      const body = {...newUser}

      // console.log(await axios.post(url,body,config));
      const data = await (await axios.post(url, body, config)).data;
      return data.message;
      
    } catch (err: any) {
      return(err.response.data.message);
    }
  }

  const updateUser = async (name: string, email: string, password: string) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/user`;
      const body = {name, email, password};

      // console.log(await axios.post(url,body,config));
      const data = await (await axios.put(url, body, config)).data;
      // console.log( data );
      if (data.message === "ok") dispatch({type: "updateUser", payload: {name, email, password}})
      else (alert(data.message));
      
    } catch (err: any) {
      return(err.response.data.message);
    }
  }
  
  return (
    <AuthContext.Provider value={{auth, login, logout, signup, updateUser}} >
      {children}
    </AuthContext.Provider>
  )
}
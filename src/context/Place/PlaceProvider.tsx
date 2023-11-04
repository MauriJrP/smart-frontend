import axios from 'axios';
import {IPlace, IComment} from '../../types'
import { PlaceContext } from './PlaceContext';
import { PlaceReducer } from './PlaceReducer';
import { useReducer, useState } from 'react'


interface IProps {
  children: JSX.Element | JSX.Element[];
}

const initialState: IPlace = {
  idPlace: 0,
  name: '',
  address: '',
  phone: '',
  openingHours: '',
  price: 0,
  rating: 0,
  placeType: '',
  location: '',
  description: '',
  galleries: []
}

export const PlaceProvider = ({children}: IProps) => {
  const [place, dispatch] = useReducer(PlaceReducer, initialState);
  const [comments, setComments] = useState<IComment[]>([]);

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const loadPlace = async (idPlace: string) => {
    const urlPlaces = `${process.env.REACT_APP_API_URL}/places/place/${idPlace}`;
    const placeData = await (await axios.get(urlPlaces)).data;
    // console.log(placeData.galleries[0].images[0].photo);
    dispatch({type: 'setPlace', payload: placeData});

    // -------- ------- ------ ----- Load comments ----- ------ ------- --------
    const urlComments = `${process.env.REACT_APP_API_URL}/comments/${idPlace}`;
    const commentsData = await (await axios.get(urlComments)).data;
    setComments([]);
    commentsData.comments.forEach((comment: any) => {
      setComments(prevState => {
        return [...prevState, {
          comment: comment.comment,
          idComment: comment.idComment,
          date: comment.ratingDate,
          rating: comment.rating,
          user: {
            name: comment.name,
            idUser: comment.idUser
          }
        }]
      })
    })
  }

  const createComment = async (rating: number, comment: string, idUser: number, idPlace: number) => {
    const url = `${process.env.REACT_APP_API_URL}/comments`
    const body = {
      rating,
      comment,
      idUser,
      idPlace
    }

    const data = await (await axios.post(url, body, config)).data;
    if (data.message === 'ok') loadPlace(idPlace.toString());
    else alert(data.message);
  }

  const deleteComment = async (idComment: number, idPlace: number) => {
    const url = `${process.env.REACT_APP_API_URL}/comments/${idComment}`
    const data = await (await axios.delete(url)).data;
    if (data.message === 'ok') loadPlace(idPlace.toString());
    else alert(data.message);
  }

  return (
    <PlaceContext.Provider value={{place, loadPlace, comments, createComment, deleteComment}} >
      {children}
    </PlaceContext.Provider>
  )
}
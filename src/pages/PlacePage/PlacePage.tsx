import { useParams } from "react-router-dom"
import {IPlace} from '../../types'
import { useEffect } from "react"

export default function PlacePage() {
  const { id } = useParams();

  return (
    false ? (
      <div className="bg-white container mx-auto p-2 md:p-10 flex flex-col">
        {/* <Main /> */}
        {/* <Gallery photos={place.photos} /> */}
        {/* {place.galleries.map((gallery, i) => <Gallery key={i} name={gallery.name} photos={gallery.images}/>)} */}
        {/* <Comments /> */}
      </div>
    ) :
    <div> No se encontró el lugar </div>
  )
}

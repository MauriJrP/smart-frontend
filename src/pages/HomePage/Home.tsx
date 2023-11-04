import { Divider, Pagination } from "@mui/material";
import Searcher from "./components/Searcher";
import PlaceCard from "./components/PlaceCard";
// import {places} from "../../data"
import {IFilters, IPlace} from "./types";
import {useState, useEffect} from 'react';
import axios from 'axios';


export default function Home() {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/places/page/${page}`;
    const fetchPlaces = async () => {
      const res = await (await axios.get(url)).data;
      setPlaces(res.places);
    }

    fetchPlaces();
  }, [])

  const search = (filters: IFilters) => {
    const url = `${process.env.REACT_APP_API_URL}/places/page/${page}`;
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const body = {...filters};
    if (filters.price && filters.price >= 100000) {
      alert("Precio demasiado alto");
      return;
    }

    const fetchPlaces = async () => {
      console.log("test")
      const res = await (await axios.post(url, body, config)).data;
      if (res.message === "ok")
        setPlaces(res.places);
      else alert(res.message)
    }

    fetchPlaces();
  }

  return (
    <div className='bg-white container mx-auto p-2 md:p-10 flex flex-col md:flex-row'>
      <div className="w-full md:w-72 md:pt-5">
        <Searcher search={search}/>
      </div>

      <Divider orientation="vertical" variant="middle" flexItem className="hidden mx-10 md:inline-flex"/>
      <Divider orientation="horizontal" variant="middle" flexItem className=" my-5 md:hidden"/>

      <div className="w-full md:w-3/4 flex flex-col">
        <div className=" h-192 overflow-auto pr-4 grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {
            places.map(place => {
              return <PlaceCard key={place.idPlace} place={place} />}
            )
          }
        </div>

        <Divider orientation="horizontal" variant="middle" flexItem className=" my-5 "/>
        <Pagination count={10} color="secondary" className="self-center" />
      </div>
    </div>
  )
}
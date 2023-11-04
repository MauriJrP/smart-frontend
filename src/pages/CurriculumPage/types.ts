export interface IPlace {
  idPlace: number;
  name: string;
  description: string;
  rating: number;
  photo: string;
}

export interface IFilters {
  idPlaceType?: number;
  idLocation?: number;
  price?: number;
  rating?: number;
}
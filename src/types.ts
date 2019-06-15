export interface IFilm {
  backgroundColor: string;
  coverLink: string;
  description: string;
  director: string;
  genre: string[];
  id: string;
  favorite: boolean;
  name: string;
  posterImage: string;
  posterLink: string;
  trailer: string;
  rating: number;
  released: number;
  duration: number;
  scoresCount: number;
  starring: string[];
  videoLink: string;
}

interface IUser {
  id: number;
  name: string;
}

export interface IReview {
  id: number;
  user: IUser;
  rating: number;
  comment: string;
  date: string;
}

import axios from "axios";
import { Concert } from "../models/concert";

const api = "api";
const serverUrl = process.env.VUE_APP_TARGET;


class ConcertService {
  getConcerts() {
    return axios.get<Concert[]>(`${serverUrl}${api}/concerts`);
  }

  getConcert(id: string) {
    return axios.get<Concert>(`${serverUrl}${api}/concerts/` + id);
  }

  createConcert(concert: Concert) {
    return axios.post<Concert>(
      `${serverUrl}${api}/concerts`,
      {
        name: concert.name,
        country: concert.country,
        date: concert.date,
        artist: concert.artist,
        image: concert.image,
        ticketsAvailable: concert.ticketsAvailable,
        ticketsLeft: concert.ticketsLeft,
        description: concert.description,
        price: concert.price
      },
      {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("concert-app-token")
        }
      }
    );
  }
}

export const concertService = new ConcertService();

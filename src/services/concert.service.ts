import axios from "axios";
import { Concert } from "../models/concert";

const api = "api";

class ConcertService {
  getConcerts() {
    return axios.get<Concert[]>(`http://localhost:3050/${api}/concerts`);
  }
}

export const concertService = new ConcertService();
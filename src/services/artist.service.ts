import axios from "axios";
import { Artist } from "../models/artist";

const api = "api";

class ArtistService {
  getArtists() {
    return axios.get<Artist[]>(`http://localhost:3050/${api}/artists`);
  }
}

export const artistService = new ArtistService();
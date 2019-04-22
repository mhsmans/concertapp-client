import axios from "axios";
import { Artist } from "../models/artist";

const api = "api";

class ArtistService {
  getArtists() {
    return axios.get<Artist[]>(`http://localhost:3050/${api}/artists`);
  }

  getArtist(id: string) {
    return axios.get<Artist>(`http://localhost:3050/${api}/artists/` + id);
  }

  createArtist(artist: Artist) {
    return axios.post<Artist>(
      `http://localhost:3050/${api}/artists`,
      {
        name: artist.name,
        bio: artist.bio
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

export const artistService = new ArtistService();

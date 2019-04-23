import axios from "axios";
import { Artist } from "../models/artist";

const api = "api";
const serverUrl = process.env.VUE_APP_TARGET;

class ArtistService {
  getArtists() {
    return axios.get<Artist[]>(`${serverUrl}${api}/artists`);
  }

  getArtist(id: string) {
    return axios.get<Artist>(`${serverUrl}${api}/artists/` + id);
  }

  createArtist(artist: Artist) {
    return axios.post<Artist>(
      `${serverUrl}${api}/artists`,
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

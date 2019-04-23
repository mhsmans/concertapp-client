import axios from "axios";
import { User } from "../models/user";

const api = "api";
const serverUrl = process.env.VUE_APP_TARGET;

class AuthService {
  login(email: String, password: String) {
    return axios.post(`${serverUrl}${api}/login`, {
      email: email,
      password: password
    });
  }

  register(user: User) {
    return axios.post(`${serverUrl}${api}/register`, {
      email: user.email,
      firstName: user.firstName,
      infix: user.infix,
      lastName: user.lastName,
      password: user.password
    });
  }

  viewProfile() {
    return axios.get(`${serverUrl}${api}/profile`, {
      headers: {
        Authorization:
          "Bearer " + window.localStorage.getItem("concert-app-token")
      }
    });
  }

  isLoggedIn() {
    let userData = this.getTokenData(
      window.localStorage.getItem("concert-app-token")
    );
    if (userData == null) {
      return false;
    } else if (userData.exp > Math.floor(Date.now() / 1000)) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      this.viewProfile()
        .then(profile => {
          if (
            profile.data.email == "admin@mail.com" &&
            profile.data.role == "admin"
          ) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(err => {
          console.log({ err });
        });
    });
  }

  getTokenData(token: string | null) {
    let payload;
    if (token !== null) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  signOut() {
    window.localStorage.removeItem("concert-app-token");
  }
}

export const authService = new AuthService();

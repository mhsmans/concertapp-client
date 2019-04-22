import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Artist from "./views/Artist.vue";
import ConcertPage from "./views/ConcertPage.vue";
import CreateContent from "./views/CreateContent.vue";

import { authService } from "@/services/auth.service";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/artist/:id",
      name: "artist",
      component: Artist
    },
    {
      path: "/concert/:id",
      name: "concert",
      component: ConcertPage
    },
    {
      path: "/create",
      name: "create-content",
      component: CreateContent,
      beforeEnter: (to, from, next) => {
        authService
          .isAdmin()
          .then(() => {
            next();
          })
          .catch(err => {
            next("/");
          });
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

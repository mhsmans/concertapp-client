import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Artist from "./views/Artist.vue";
import Concert from "./views/Concert.vue";

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
      component: Concert
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

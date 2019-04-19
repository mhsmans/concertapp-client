<template>
  <div class="profile">
    <div v-if="loggedIn == true">
      <div class="page-title">
        <h1>My Profile</h1>
      </div>
      <div class="profile-wrap">
        <div class="name" v-if="profile">
          <p>
            Account owner:
            <span>{{ profile.firstName }} {{ profile.infix }} {{ profile.lastName }}</span>
          </p>
        </div>
        <div class="email">
          <p>
            E-mail address:
            <span>{{ profile.email }}</span>
          </p>
        </div>
        <div class="sign-out-button">
          <button class="sign-out-button" @click="signOut">Sign out</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="message-wrap">
        <h2>Please sign in to view this page.</h2>
        <button class="button" @click="toggleAuthModal">Sign in</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { authService } from "../services/auth.service";
import { Route, NavigationGuard } from "vue-router";
import { User } from "@/models/user";

@Component({})
export default class Profile extends Vue {
  profile: User = <User>{};

  created() {
    this.getProfileData();
  }

  toggleAuthModal(): void {
    this.$store.commit("toggleAuthModal");
  }

  get loggedIn(): Boolean {
    if (
      !authService.isLoggedIn() &&
      window.localStorage.getItem("concert-app-token") !== null
    ) {
      window.localStorage.removeItem("concert-app-token");
      return false;
    } else if (authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  getProfileData() {
    if (this.loggedIn) {
      authService.viewProfile().then(res => {
        this.profile = res.data;
      });
    }
  }

  // Need to remove my profile
  signOut() {
    authService.signOut();
    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>

.message-wrap {
  text-align: center;
  background-color: $color-background-secondary;
  width: fit-content;
  margin: 0 auto;
  padding: 50px;
}

.profile-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 10px;
  background-color: $color-background-secondary;
}

.name {
  grid-column-start: 1;
  grid-column-end: 2;

  p {
    font-size: 1.2em;
    margin: 0;
  }
}

.email {
  grid-column-start: 1;
  grid-column-end: 2;

  p {
    font-size: 1.2em;
    margin: 0;
  }
}

.sign-out-button {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  font-size: 1.1em;
  background-color: $color-background-secondary;
  color: $color-white;
  cursor: pointer;
  width: 100%;
  text-align: right;

  > button {
    border: 2px solid $color-red;
    padding: 10px 20px 10px 20px;
    height: 100%;
    width: fit-content;
  }
}
</style>

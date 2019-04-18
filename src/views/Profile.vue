<template>
  <div class="profile">
    <div v-if="loggedIn == true">
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
          <button class="close-button" @click="signOut">Sign out</button>
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
    return authService.isLoggedIn();
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
</style>

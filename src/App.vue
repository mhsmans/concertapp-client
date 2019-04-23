<template>
  <div class="main-container">
    <div id="app">
      <div id="nav">
        <div class="left-group">
          <router-link :to="{ name: 'home' }">
            <p class="branding">{{ appTitle }}</p>
          </router-link>
        </div>
        <div class="right-group">
          <router-link to="/">Home</router-link>
          <router-link v-if="userSignedIn === true" router-link to="/profile">My Profile</router-link>
          <a v-else @click.prevent="toggleAuthModal">Sign in</a>
        </div>
      </div>
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <transition name="fade">
        <div v-if="authModal" class="modal-mask" @click="toggleAuthModal">
          <Authentication></Authentication>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Authentication from "@/views/Authentication.vue";

@Component({
  components: { Authentication }
})
export default class Home extends Vue {
  userSignedIn: Boolean = false;

  get appTitle() {
    return process.env.VUE_APP_TITLE;
  }

  beforeMount() {
    this.userSignedIn = this.SignedIn();
  }

  beforeUpdate() {
    this.userSignedIn = this.SignedIn();
  }

  get authModal() {
    return this.$store.getters.authModal;
  }

  SignedIn() {
    if (window.localStorage.getItem("concert-app-token") !== null) {
      return true;
    } else {
      return false;
    }
  }

  toggleAuthModal() {
    this.$store.commit("toggleAuthModal");
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Maven+Pro|Exo+2");

#app {
  font-family: "Maven Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-white;
}

#nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 80px;
  background-color: $color-background-header;
  @include nav-shadow;

  a {
    font-size: 1.2em;
    font-weight: bold;
    color: $color-white;
  }

  > .right-group > a {
    &.router-link-exact-active {
      color: $color-primary;
    }
  }
}

.branding {
  margin: 0;
  width: fit-content;
}

.right-group {
  text-align: right;

  a {
    margin: 0px 20px;
    transition: color 0.3s ease;
  }
  :last-child {
    margin-right: 0;
  }
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-background, 0.6);
}
</style>

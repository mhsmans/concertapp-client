<template>
  <div class="create-content">
    <div class="page-title">
      <h1>Create Content</h1>
    </div>

    <div v-if="createArtist">
      <transition name="fade" mode="out-in">
        <ArtistForm></ArtistForm>
      </transition>
    </div>
    <div v-else>
      <transition name="fade" mode="out-in">
        <ConcertForm></ConcertForm>
      </transition>
    </div>

    <button class="button" @click="toggleForm">Change Content Type</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { authService } from "../services/auth.service";
import { User } from "@/models/user";
import ArtistForm from "@/components/ArtistForm.vue";
import ConcertForm from "@/components/ConcertForm.vue";

@Component({
  components: { ArtistForm, ConcertForm }
})
export default class CreateContent extends Vue {
  profile: User = <User>{};

  toggleAuthModal(): void {
    this.$store.commit("toggleAuthModal");
  }

  signOut() {
    authService.signOut();
    this.$router.push("/");
  }

  get createArtist(): boolean {
    return this.$store.getters.createArtist;
  }

  toggleForm(): void {
    this.$store.commit("toggleCreateArtist");
  }
}
</script>

<style lang="scss" scoped>
</style>

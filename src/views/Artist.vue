<template>
  <div class="artist">
    <div class="page-title">
      <h1>Artist Info</h1>
    </div>
    <div class="artist-wrap">
      <div class="name">{{ artist.name }}</div>
      <div class="bio" v-html="artist.bio"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Artist } from "@/models/artist";
import { artistService } from "@/services/artist.service";

@Component({})
export default class Profile extends Vue {
  artist: Artist = <Artist>{};

  created() {
    artistService
      .getArtist(this.$route.params.id)
      .then(artist => {
        this.artist = artist.data;
      })
      .catch(err => {
        console.log("failed to find artist");
      });
  }
}
</script>

<style lang="scss" scoped>

.artist-wrap {
    background-color: $color-background-secondary;
    padding: 10px;
}

.name {
    font-size: 1.6em;
    margin-bottom: 20px;
}

.bio {
    font-size: 1.2em;
    line-height: 1.5;
}
</style>

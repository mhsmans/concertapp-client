<template>
  <div class="artist-form">
    <div class="form-wrap">
      <h1 class="title">New Artist</h1>
      <form id="artist">
        <div class="form-step">
          <input
            type="text"
            id="name"
            placeholder="Artist name"
            class="form-input"
            v-model="artist.name"
          >
        </div>
        <div class="form-step">
          <textarea
            type="textarea"
            id="bio"
            placeholder="Artist bio"
            class="form-input"
            rows="10"
            v-model="artist.bio"
          />
        </div>
        <div class="form-step-buttons">
          <button class="button" @click.prevent="submit">Create Artist</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Artist } from "@/models/artist";
import { artistService } from "@/services/artist.service";

@Component({})
export default class ArtistForm extends Vue {
  artist: Artist = <Artist>{};

  submit() {
    artistService
      .createArtist(this.artist)
      .then(artist => {
        alert("Artist created!");
        this.artist = <Artist>{};
      })
      .catch(err => {
        alert("Artist creation failed. Check console for more info.");
        console.log({ error: err });
      });
  }
}
</script>

<style lang="scss" scoped>

.form-wrap {
  background-color: $color-background-secondary;
  padding: 50px;
  width: 100%;
  margin: 20px auto;
  border-radius: 5px;
  border: 2px solid $color-background-header;
}
</style>
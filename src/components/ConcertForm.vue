<template>
  <div class="concert-form">
    <div class="form-wrap">
      <h1 class="title">New Concert</h1>
      <form id="concert">
        <div class="form-step">
          <input
            type="text"
            id="name"
            placeholder="Concert name"
            class="form-input"
            v-model="concert.name"
          >
        </div>
        <div class="form-step">
          <input
            type="text"
            id="country"
            placeholder="Country"
            class="form-input"
            v-model="concert.country"
          >
        </div>
        <div class="form-step">
          <input
            type="text"
            id="date"
            placeholder="Date (dd-mm-yyyy)"
            class="form-input"
            v-model="concert.date"
          >
        </div>
        <div class="form-step">
          <label>Artist</label>
          <select type="select" id="artist" class="form-input" v-model="concert.artist">
            <option
              v-for="artist in artists"
              :key="artist._id"
              v-bind:value="artist._id"
            >{{ artist.name }}</option>
          </select>
        </div>
        <div class="form-step">
          <input
            type="text"
            id="image-url"
            placeholder="Image Url"
            class="form-input"
            v-model="concert.image"
          >
        </div>
        <div class="form-step">
          <input
            type="number"
            min="0"
            step="100"
            id="tickets-available"
            placeholder="Tickets Available"
            class="form-number"
            v-model="concert.ticketsAvailable"
          >
        </div>
        <div class="form-step">
          <input
            type="number"
            min="0"
            step="100"
            id="tickets-left"
            placeholder="Tickets Left"
            class="form-number"
            v-model="concert.ticketsLeft"
          >
        </div>
        <div class="form-step">
          <input
            type="number"
            min="0"
            step=".01"
            id="price"
            placeholder="Ticket Price"
            class="form-number"
            v-model="concert.price"
          >
        </div>
        <div class="form-step">
          <textarea
            type="textarea"
            id="description"
            placeholder="Concert Description"
            class="form-input"
            rows="10"
            v-model="concert.description"
          />
        </div>

        <div class="form-step-buttons">
          <button class="button" @click.prevent="submit">Create Concert</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Concert } from "@/models/concert";
import { Artist } from "@/models/artist";
import { concertService } from "@/services/concert.service";
import { artistService } from "@/services/artist.service";

@Component({})
export default class ConcertForm extends Vue {
  concert: Concert = <Concert>{};
  artists: Artist[] = <Artist[]>[];

  created() {
    this.artists = [];
    artistService
      .getArtists()
      .then(response => (this.artists = response.data))
      .catch(err => console.log(err));
  }

  submit() {
    concertService
      .createConcert(this.concert)
      .then(concert => {
        alert("Concert created!");
        this.concert = <Concert>{};
      })
      .catch(err => {
        alert("Concert creation failed. Check console for more info.");
        console.log({ error: err });
      });
  }
}
</script>

<style lang="scss" scoped>
.form-input {
  width: 100%;
}

.form-wrap {
  background-color: $color-background-secondary;
  padding: 50px;
  width: 100%;
  margin: 20px auto;
  border-radius: 5px;
  border: 2px solid $color-background-header;
}
</style>
<template>
  <div class="home">
    <div v-if="concerts === []">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <div v-else>
      <div class="page-title">
        <h1>Featured</h1>
      </div>
      <div>
        <ConcertFeatured></ConcertFeatured>
      </div>
      <div class="seperator">
        <div
          class="filter-concert"
          @click="setConcertListActive"
          :class="{'active': concertListActive}"
        >
          <h2>Concerts</h2>
        </div>
        <div
          class="filter-artist"
          @click="setArtistListActive"
          :class="{'active': !concertListActive}"
        >
          <h2>Artists</h2>
        </div>
      </div>
      <div class="list-wrap">
        <div v-if="concertListActive">
          <transition name="fade" mode="out-in">
            <ConcertList></ConcertList>
          </transition>
        </div>
        <div v-else>
          <transition name="fade" mode="out-in">
            <ArtistList></ArtistList>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ConcertList from "../components/ConcertList.vue";
import ArtistList from "../components/ArtistList.vue";
import ConcertFeatured from "../components/ConcertFeatured.vue";
import { concertService } from "../services/concert.service";
import { artistService } from "../services/artist.service";
import { Artist } from "../models/artist";
import { Concert } from "../models/concert";

@Component({
  components: { ConcertFeatured, ConcertList, ArtistList }
})
export default class Home extends Vue {
  concerts: Concert[] = <Concert[]>[];
  artists: Artist[] = <Artist[]>[];

  created() {
    this.concerts = [];
    concertService
      .getConcerts()
      .then(response => (this.concerts = response.data))
      .then(() => {
        this.$store.commit("storeConcerts", this.concerts);
      })
      .catch(err => console.log(err));

    this.artists = [];
    artistService
      .getArtists()
      .then(response => (this.artists = response.data))
      .then(() => {
        this.$store.commit("storeArtists", this.artists);
      })
      .catch(err => console.log(err));
  }

  setConcertListActive() {
    this.$store.commit("setConcertListActive");
  }

  setArtistListActive() {
    this.$store.commit("setArtistListActive");
  }

  get concertListActive() {
    return this.$store.getters.concertListActive;
  }
}
</script>

<style lang="scss" scoped>
.seperator {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-transform: uppercase;
  margin-top: 10px;
}

h2 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.filter-concert {
  padding: 10px;
  cursor: pointer;
  background-color: $color-background-header;
  border: 2px solid $color-background-secondary;
}

.filter-artist {
  padding: 10px;
  cursor: pointer;
  background-color: $color-background-header;
  border: 2px solid $color-background-secondary;
}

.active {
  background-color: $color-background-secondary;
  color: $color-primary;
}

.list-wrap {
  min-height: 50vh;
}
</style>

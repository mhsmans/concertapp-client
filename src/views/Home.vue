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
      <div class="featured-title">
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
      <div>
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
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ConcertList from "../components/ConcertList.vue";
import ConcertFeatured from "../components/ConcertFeatured.vue";
import { concertService } from "../services/concert.service";
import { Concert } from "../models/concert";

@Component({
  components: { ConcertFeatured, ConcertList }
})
export default class Home extends Vue {
  concerts: Concert[] = <Concert[]>[];

  created() {
    this.concerts = [];
    concertService
      .getConcerts()
      .then(response => (this.concerts = response.data))
      .then(() => {
        this.$store.commit("storeConcerts", this.concerts);
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
.featured-title {
  width: fit-content;
  padding: 0 10px;
  border-left: 4px solid $color-primary;
  margin-bottom: 20px;
  text-transform: uppercase;
}

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
</style>

<template>
  <div class="artist-list">
    <div v-for="artist in artists" :key="artist._id">
      <div class="artist-background" @click="toArtistDetail(artist._id)">
        <div class="artist">
          <div class="title">
            <p>{{ artist.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ArtistList extends Vue {
  get artists() {
    return this.$store.getters.artists;
  }

  toArtistDetail(id: string) {
    this.$router.push("/artist/" + id);
  }
}
</script>

<style lang="scss" scoped>
.artist-background {
  background-color: $color-primary;
}

.artist {
  padding: 10px;
  background-color: $color-background-secondary;
  margin-bottom: 5px;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateX(5px);
  }

  p {
    margin: 0;
    font-size: 1.2em;
    text-transform: uppercase;
  }
}
</style>


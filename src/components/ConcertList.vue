<template>
  <div class="concert-list">
    <div v-for="concert in concerts" :key="concert._id">
      <div v-if="concert._id != concerts[0]._id">
        <div class="concert-background" @click="toConcertDetail(concert._id)">
          <div class="concert">
            <div class="image">
              <img :src="concert.image">
            </div>
            <div class="right-grid">
              <div class="title">
                <p>{{ concert.name }}</p>
              </div>
              <div class="date">
                <p>Date: {{ concert.date }}</p>
              </div>
              <div class="country">
                <p>Country: {{ concert.country }}</p>
              </div>
              <div class="artist">
                <p>Artist: {{ concert.artist.name }}</p>
              </div>
              <div class="tickets">
                <p><span class="tickets-left">{{ concert.ticketsLeft }}</span> / {{ concert.ticketsAvailable }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ConcertList extends Vue {
  get concerts() {
    return this.$store.getters.concerts;
  }

  toConcertDetail(id: string) {
    this.$router.push("/concert/" + id);
  }
}
</script>

<style lang="scss" scoped>
.concert-background {
  background-color: $color-primary;
}

.tickets-left {
  color: $color-primary;
  margin-left: 10px;
}

.concert {
  display: grid;
  grid-template-columns: 40% 60%;
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

.right-grid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0 10px 0 10px;
}

.image {
  > img {
    object-fit: cover;
    width: 100%;
    height: 200px;
    vertical-align: bottom;
  }
}

.tickets {
  text-align: right;
  grid-row-start: 6;
}
</style>


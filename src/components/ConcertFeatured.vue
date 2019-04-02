<template>
  <div v-if="concerts[0]">
    <div class="concert-background">
      <div class="concert-featured">
        <div class="image">
          <img :src="concerts[0].image" alt>
          <div class="image-wrap">
            <div class="title">
              <h2>{{ concerts[0].name }}</h2>

              <div class="date">
                <p>{{ concerts[0].date }}</p>
                <p>/</p>
                <p>{{ concerts[0].country }}</p>
              </div>
            </div>
            <div class="tickets">
              <p>Tickets left:</p>
              <p class="tickets-left">{{ concerts[0].ticketsLeft }}</p>
              <p>/</p>
              <p>{{ concerts[0].ticketsAvailable }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { Concert } from "../models/concert";

@Component({})
export default class ConcertFeatured extends Vue {
  get concerts() {
    return this.$store.getters.concerts;
  }
}
</script>

<style lang="scss" scoped>
.concert-background {
  background-color: $color-white;
}

.concert-featured {
  text-shadow: 2px 2px 3px $color-gray;
  padding: 10px;
  background-color: $color-background-secondary;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
}

.image {
  position: relative;

  > img {
    object-fit: cover;
    width: 100%;
    height: 500px;
    vertical-align: bottom;
  }
}

.image-wrap {
  height: 500px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 0.25fr 0.5fr 0.25fr;
}

.title {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 3;

  margin: 0 auto;
  padding: 10px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  background-color: rgba($color-gray, 0.4);

  > h2 {
    margin: 0;
  }

  > .date {
    display: inline-flex;
    font-size: 1.2em;
    > p {
      margin-bottom: 0;
    }
  }
}

.tickets {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 6;
  grid-row-end: 7;

  display: inline-flex;
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.2em;
  margin: 0 auto;
  padding: 10px;
  background-color: rgba($color-gray, 0.4);

  > p {
    margin-top: 0;
    margin-bottom: 0;
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    height: fit-content;
  }
}

.tickets-left {
  color: $color-primary;
  margin-left: 10px;
}
</style>


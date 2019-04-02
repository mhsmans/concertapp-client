<template>
  <div class="concert-list">
    <div v-for="concert in concerts" :key="concert.id">
      <div class="concert-background">
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
}
</script>

<style lang="scss" scoped>
.concert-background {
  background-color: $color-primary;
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
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
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
</style>


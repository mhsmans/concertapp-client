<template>
  <div class="home">
    <div class="featured-title">
      <h1>Featured</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.featured-title {
  width: fit-content;
  padding: 0 10px;
  border-left: 4px solid $color-primary;
}
</style>


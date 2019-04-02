<template>
  <div class="main-container">
    <div id="app">
      <div id="nav">
        <div class="left-group">
          <router-link :to="{name: 'home'}">
            <p class="branding">Concert-app</p>
          </router-link>
        </div>
        <div class="right-group">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Maven+Pro|Exo+2");

#app {
  font-family: "Maven Pro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-white;
}

#nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 80px;
  background-color: $color-background-header;
  @include nav-shadow;

  a {
    font-size: 1.4em;
    font-weight: bold;
    color: $color-white;
  }

  > .right-group > a {
    &.router-link-exact-active {
      color: $color-primary;
    }
  }
}

.branding {
  margin: 0;
  width: fit-content;
}

.right-group {
  text-align: right;

  a {
    margin: 0px 10px;
    transition: color 0.3s ease;
  }
  :last-child {
    margin-right: 0;
  }
}
</style>

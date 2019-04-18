<template>
  <div class="container">
    <div class="form-wrap" @click.stop>
      <form id="login" @keydown.esc="toggleAuthModal">
        <div class="error-message" v-show="hasError">
          <p>Invalid username and password combination.</p>
        </div>
        <div class="form-step">
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            class="form-input"
            v-bind:class="{'error' : hasError}"
            v-model="inputData.email"
          >
        </div>
        <div class="form-step">
          <input
            @keydown.enter.prevent="submit"
            type="password"
            id="password"
            placeholder="Password"
            class="form-input"
            v-bind:class="{'error' : hasError}"
            v-model="inputData.password"
          >
        </div>
        <div class="register-link">
          <a @click.prevent="register">New here? Sign up!</a>
        </div>
        <div class="form-step-buttons">
          <button class="close-button" @click.prevent="toggleAuthModal">Close</button>
          <button class="button" @click.prevent="submit">Log in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { authService } from "../services/auth.service";
import router from '../router';

@Component({})
export default class LoginForm extends Vue {
  inputData = {
    email: "",
    password: ""
  };

  hasError: Boolean = false;

  toggleAuthModal() {
    this.$store.commit("toggleAuthModal");
  }

  register() {
    this.$store.commit("toggleLoginModal");
  }

  submit() {
    if (this.inputData.email !== "" && this.inputData.password !== "") {
      authService
        .login(this.inputData.email, this.inputData.password)
        .then(token => {
          if (token) {
            this.hasError = false;
            this.$store.commit("storeUserData", token.data);
            this.$store.commit("toggleAuthModal");
            router.push("/");
          } else {
            this.hasError = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.hasError = true;
        });
    } else {
      this.hasError = true;
    }
  }
}
</script>

<style lang="scss">
.form-wrap {
  background-color: $color-background-secondary;
  padding: 50px;
  width: fit-content;
  margin: 100px auto;
  border-radius: 5px;
  border: 2px solid $color-primary;
}

.form-step {
  margin: 20px 0 20px 0;
}

.form-step-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

input {
  font-size: 1.3em;
  padding: 10px;
  background-color: $color-white;
  border: 0;
  color: $color-gray;
}

.button {
  font-size: 1.2em;
  border: 2px solid $color-primary;
  padding: 10px 20px 10px 20px;
  background-color: $color-background-secondary;
  color: $color-white;
  cursor: pointer;
}

.close-button {
  font-size: 1.2em;
  border: 2px solid $color-red;
  padding: 10px 20px 10px 20px;
  background-color: $color-background-secondary;
  color: $color-white;
  cursor: pointer;
}

.register-link {
  font-size: 0.8em;
  text-decoration: underline;
  cursor: pointer;
  color: $color-primary;
  display: block;
  width: fit-content;
  margin: 0 auto;
}

.error {
  border: 2px solid $color-red;
  transition: all 0.2s ease;
}

.error-message {
  text-align: left;
  color: $color-white;
  margin-bottom: 5px;
}
</style>
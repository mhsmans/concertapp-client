<template>
  <div class="container">
    <div class="form-wrap" @click.stop>
      <form id="register" @keydown.esc="toggleAuthModal">
        <div class="form-step">
          <p class="error-message" v-if="emailAlreadyInUse">This email address is already in use.</p>

          <p class="error-message" v-if="hasEmailError">Valid e-mail is required.</p>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            class="form-input"
            v-bind:class="{'error' : hasEmailError}"
            v-model="inputData.email"
          >
        </div>
        <div class="form-step">
          <p class="error-message" v-if="hasFirstNameError">Please enter a human firstname.</p>
          <input
            type="text"
            id="firstname"
            placeholder="Firstname"
            class="form-input"
            v-bind:class="{'error' : hasFirstNameError}"
            v-model="inputData.firstName"
          >
        </div>
        <div class="form-step">
          <input
            type="text"
            id="infix"
            placeholder="Infix"
            class="form-input"
            v-model="inputData.infix"
          >
        </div>
        <div class="form-step">
          <p class="error-message" v-if="hasLastNameError">Please enter a human lastname.</p>
          <input
            type="text"
            id="lastname"
            placeholder="Lastname"
            class="form-input"
            v-bind:class="{'error' : hasLastNameError}"
            v-model="inputData.lastName"
          >
        </div>
        <div class="form-step">
          <p
            class="error-message"
            v-if="hasPasswordError"
          >Password must be at least 6 characters long.</p>
          <input
            @keydown.enter.prevent="submit"
            type="password"
            id="password"
            placeholder="Password"
            class="form-input"
            v-bind:class="{'error' : hasPasswordError}"
            v-model="inputData.password"
          >
        </div>
        <div class="register-link">
          <a @click.prevent="register">Already have an account?</a>
        </div>
        <div class="form-step-buttons">
          <button class="close-button" @click.prevent="toggleAuthModal">Close</button>
          <button class="button" @click.prevent="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { User } from "../models/user";
import { Ticket } from "../models/ticket";
import { authService } from "../services/auth.service";

@Component({})
export default class RegisterForm extends Vue {
  inputData: User = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    infix: ""
  };

  hasEmailError: Boolean = false;
  hasFirstNameError: Boolean = false;
  hasLastNameError: Boolean = false;
  hasPasswordError: Boolean = false;
  emailAlreadyInUse: Boolean = false;

  toggleAuthModal() {
    this.$store.commit("toggleAuthModal");
  }

  register() {
    this.$store.commit("toggleLoginModal");
  }

  submit() {
    if (this.checkForm()) {
      authService
        .register(this.inputData)
        .then(token => {
          this.$store.commit("storeUserData", token.data);
          this.$store.commit("toggleAuthModal");
          this.$router.push("/");
        })
        .catch(err => {
          this.emailAlreadyInUse = true;
        });
    }
  }

  // Email format regex
  validEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // Only use letters
  validName(name: string) {
    const re = /^[a-z]+$/i;
    return re.test(name);
  }

  // At least 6 characters
  validPassword(password: string) {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  checkForm(): boolean {
    if (this.inputData.email !== "" && this.validEmail(this.inputData.email)) {
      this.hasEmailError = false;
    } else {
      this.hasEmailError = true;
    }

    if (
      this.inputData.firstName !== "" &&
      this.validName(this.inputData.firstName)
    ) {
      this.hasFirstNameError = false;
    } else {
      this.hasFirstNameError = true;
    }

    if (
      this.inputData.lastName !== "" &&
      this.validName(this.inputData.lastName)
    ) {
      this.hasLastNameError = false;
    } else {
      this.hasLastNameError = true;
    }

    if (this.validPassword(this.inputData.password)) {
      this.hasPasswordError = false;
    } else {
      this.hasPasswordError = true;
    }

    if (
      !this.hasEmailError &&
      !this.hasFirstNameError &&
      !this.hasLastNameError &&
      !this.hasPasswordError
    ) {
      return true;
    } else {
      return false;
    }
  }
}
</script>

<style lang="scss">
</style>
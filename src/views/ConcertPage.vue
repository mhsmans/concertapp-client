<template>
  <div class="concert">
    <div class="page-title">
      <h1>Concert Info</h1>
    </div>
    <div class="concert-wrap">
      <div class="name">{{ concert.name }}</div>
      <div class="artist" v-if="concert.artist">Artist: {{ concert.artist.name }}</div>
      <div class="country">Country: {{ concert.country }}</div>
      <div class="date">Date: {{ concert.date }}</div>
      <div class="tickets">
        Tickets available:
        <span class="tickets-left">{{ concert.ticketsLeft }}</span>
        / {{ concert.ticketsAvailable }}
      </div>
      <div class="price">Ticketprice: &euro;{{ concert.price }},-</div>
      <div>
        <button class="button" v-if="loggedIn" @click="addTicketToUser">Place order</button>
      </div>
    </div>
    <div class="image-wrap">
      <div class="image">
        <img :src="concert.image">
      </div>
      <div class="description" v-html="concert.description"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Concert } from "@/models/concert";
import { Ticket } from "@/models/ticket";
import { concertService } from "@/services/concert.service";
import { authService } from "@/services/auth.service";
import { ticketService } from "@/services/ticket.service";

@Component({})
export default class ConcertPage extends Vue {
  concert: Concert = <Concert>{};
  ticket: Ticket = <Ticket>{};

  created() {
    concertService
      .getConcert(this.$route.params.id)
      .then(concert => {
        this.concert = concert.data;
      })
      .catch(err => {
        console.log("failed to find concert");
      });
  }

  addTicketToUser() {
    this.ticket.concertId = this.concert._id;
    let conf = confirm("Press ok to confirm ticket order.");
    if (conf) {
      ticketService
        .addTicket(this.ticket)
        .then(res => {
          alert("Ticket order added to profile!");
        })
        .catch(err => {
          console.log("failed to add ticket order.");
        });
    }
  }

  get loggedIn(): Boolean {
    if (
      !authService.isLoggedIn() &&
      window.localStorage.getItem("concert-app-token") !== null
    ) {
      window.localStorage.removeItem("concert-app-token");
      return false;
    } else if (authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.concert-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: $color-background-secondary;
  padding: 10px;
  margin-bottom: 10px;
}

.image-wrap {
  background-color: $color-background-secondary;
  padding: 10px;
}

.name {
  font-size: 1.6em;
  margin-bottom: 10px;
  grid-column-start: 1;
  grid-column-end: 2;
}

.artist,
.country,
.date {
  font-size: 1.2em;
  grid-column-start: 1;
  grid-column-end: 2;
  margin-bottom: 5px;
}

.tickets-left {
  color: $color-primary;
}

.tickets {
  font-size: 1.2em;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  margin-bottom: 5px;
}

.price {
  font-size: 1.2em;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  margin-bottom: 5px;
}

.button {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 5;
  padding: 5px;
  font-size: 1.1em;
  margin-top: 10px;
}

.image {
  > img {
    object-fit: cover;
    width: 100%;
    height: 500px;
    vertical-align: bottom;
  }
}

.description {
  font-size: 1.2em;
  line-height: 1.5;
  margin-top: 20px;
}
</style>

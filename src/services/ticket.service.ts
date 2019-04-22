import axios from "axios";
import { Ticket } from "../models/ticket";

const api = "api";

class TicketService {
  addTicket(ticket: Ticket) {
    return axios.post<Ticket>(
      `http://localhost:3050/${api}/ticket/`,
      {
        concert: ticket.concertId
      },
      {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("concert-app-token")
        }
      }
    );
  }
}

export const ticketService = new TicketService();

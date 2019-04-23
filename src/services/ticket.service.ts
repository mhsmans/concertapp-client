import axios from "axios";
import { Ticket } from "../models/ticket";

const api = "api";
const serverUrl = process.env.VUE_APP_TARGET;

class TicketService {
  addTicket(ticket: Ticket) {
    return axios.post<Ticket>(
      `${serverUrl}${api}/ticket`,
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

import axios from "axios";
import { Ticket } from "../models/ticket";

const api = "api";
const serverUrl = "http://localhost:3050/"

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

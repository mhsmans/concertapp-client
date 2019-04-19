import { Artist } from "./artist";
export class Concert {
  constructor(
    public name: string,
    public country: string,
    public date: Date,
    public artist: Artist,
    public image: string,
    public ticketsAvailable: number,
    public ticketsLeft: number,
    public description: string,
    public price: number
  ) {}
}

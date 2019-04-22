
export class Concert {
  constructor(
    public _id: string,
    public name: string,
    public country: string,
    public date: string,
    public artist: string,
    public image: string,
    public ticketsAvailable: number,
    public ticketsLeft: number,
    public description: string,
    public price: number
  ) {}
}

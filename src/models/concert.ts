export class Concert {
  constructor(
    public id: string,
    public name: string,
    public country: string,
    public date: Date,
    public artistId: string,
    public image: string,
    public ticketsAvailable: number,
    public ticketsLeft: number
  ) {}
}

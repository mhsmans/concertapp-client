import { Ticket } from './ticket';

export class User {
    constructor(
      public email: string,
      public firstName: string,
      public lastName: string,
      public password: string,
      public tickets?: [Ticket],
      public infix?: string,
    ) {}
  }
  
import { Ticket } from './ticket';

export class User {
    constructor(
      public email: string,
      public firstName: string,
      public lastName: string,
      public password: string,
      public role?: string,
      public tickets?: [string],
      public infix?: string
    ) {}
  }
  
export interface IUser {
    "balance": string,
    "picture": string,
    "age": number,
    "name": string,
    "gender": string,
    "company": string,
    "email": string
}
export class User {
    id?: string;
    email?: string;
    password?: string;
    token?: string;
  }
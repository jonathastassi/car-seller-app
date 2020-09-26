import { Login } from "./login";

export interface Register extends Login {
  name: string;
  phone: string;
  city: string;
}

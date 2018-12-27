import { DateTime } from "ionic-angular";

export class RegisterUserView {
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: DateTime;
    gender: number;
    password: string;
    confirmPassword: string;
}
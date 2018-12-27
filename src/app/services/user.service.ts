import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateUserView } from '../models/authenticate-user-view';
import { RegisterUserView } from '../models/register-user-view';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    authenticate(view: AuthenticateUserView) {
        return this.httpClient.post('/api/user/authenticate', view);
    }

    register(view: RegisterUserView) {
        return this.httpClient.post('/api/user/register', view);
    }

    register1(view: RegisterUserView) {
        return this.httpClient.post('/api/user/register', view);
    }
}
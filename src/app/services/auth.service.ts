import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser() {
    return Parse.User.current();
  }

  async login(username: string, password: string) {
    return await Parse.User.logIn(username, password);
  }

  async logout() {
    return await Parse.User.logOut();
  }

}

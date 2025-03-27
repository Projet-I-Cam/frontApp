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



   async registerUser(fullname:string, username: string, password: string, email: string): Promise<any> {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.set('fullname', fullname);
    try {
      const newUser = await user.signUp();
      return newUser;
    } catch (error) {
      console.error("Error while registering user", error);
      throw error;
    }
  }

}

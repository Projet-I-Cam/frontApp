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
    try {
      const user: any =  await Parse.User.logIn(username, password);
      console.log('User loged here => Parse Object ', user)
      console.log('User fulldata ', user.toJSON())
      console.log('Or user one attribute ', user.get('email'))

      const query = new Parse.Query(Parse.User);
      query.include("role");
      const newUserObject = await query.get(user.id);
      return {
        ...newUserObject.toJSON(),
      }
    } catch (error) {
      console.error('An error occurred while Parse.Login: ', error)
      return {
        error: error
      }
    }
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

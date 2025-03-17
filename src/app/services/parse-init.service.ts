import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseInitService {

  constructor() {
    // ⚙️ Remplace par tes vraies clés / URL
    Parse.initialize('hC9Y8NG2uLLTUVaZsoa30CW0S', '2cQBXh9nDkQDZC7J8Mu9');
    Parse.serverURL = 'http://5.196.68.13:1337/parse'; // URL de ton Parse Server
  }

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

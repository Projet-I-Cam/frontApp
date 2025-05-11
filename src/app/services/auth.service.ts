import { Injectable } from '@angular/core';
import Parse from 'parse';
import { getOneByPointer$ } from './statefull/genericParse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUser() {
    return Parse.User.current();
  }


  async getCurrentPerson(): Promise<any> {
    const currentUser : any = this.getCurrentUser ();
    return new Promise((resolve, reject) => {
      getOneByPointer$('Person', 'user', '_User ', currentUser?.id).subscribe(result => {
        if (result?.error) {
          console.error(result.message);
          reject(result.message);
        } else if (result) {
          resolve(result);
        } else {
          console.log('No person found for that user pointer.', currentUser.id);
          resolve(null); // ou reject si vous préférez
        }
      });
    });
  }
  

  async login(username: string, password: string) {
    try {
      const user: any =  await Parse.User.logIn(username, password);

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



  async registerUser (
    fullname: string,
    username: string,
    password: string,
    email: string,
    roleTaskName: string = ''
): Promise<any> {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.set('fullname', fullname);

    if (roleTaskName) {
      const result = await Parse.Cloud.run(
          "getRole", 
          {
              task_name: roleTaskName
          }
      )
      if(result.success){
        const role : any = {
          __type: "Pointer", 
          className: "_Role", 
          objectId: result.role.objectId
        };
        user.set('role', role);
      }else{
        console.error("Une erreur s'est produite pendant la recupération du rôle "+roleTaskName)
        return ;
      }
      
    }

    try {
        const newUser  = await user.signUp();
        return newUser ;
    } catch (error: unknown) {
        console.error("Error while registering user", error);
        if (error instanceof Error) {
            throw new Error(error.message); // Throw the error message if it's an instance of Error
        } else {
            throw new Error("An unknown error occurred during user registration."); // Fallback for unknown errors
        }
    }
  } 




   // Primary method: Use matchesQuery on pointer field "user"
   async getPersonByUser(userId = '') {
    try {
      if (!userId) {
        const currentUser  = this.getCurrentUser ();
        userId = currentUser ?.id || '';
      }
      if (!userId) {
        console.error('No user ID provided and no current user found.');
        return null;
      }
      console.log('Fallback: userId:', userId);
      const personQuery = new Parse.Query('Person');
      const persons = await personQuery.find();
      // Filter locally by user id
      const person = persons.find(p => {
        const userPointer = p.get('user');
        return userPointer && userPointer.id === userId;
      });
      console.log('Fallback person found:', person);
      return person || null;
    } catch (error) {
      console.error('Error in getPersonByUser Fallback:', error);
      return null;
    }
  }

  async fetchCurrentPerson() : Promise<any>{
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      console.error('No current user found.');
      return null;
    }
    console.log(currentUser.id)
    getOneByPointer$('Person', 'user', '_User', currentUser.id).subscribe(result => {
      if (result?.error) {
        console.error(result.message);
        return null;
      } else if (result) {
        return result;
      } else {
        console.log('No person found for that user pointer.');
        return null;
      }
    });
  }


}

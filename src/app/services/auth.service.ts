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

}

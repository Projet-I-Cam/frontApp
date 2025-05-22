import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getPersonByUserId } from '../../services/statefull/genericParse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<any>(null);
  private personSubject = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();
  public person$: Observable<any> = this.userSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    const person = localStorage.getItem('person');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
    if(person){
      this.personSubject.next(JSON.parse(person));
    }
  }
  async setUser(userData: any) {
    this.userSubject.next(userData);
    const person = await getPersonByUserId(userData.objectId);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('person', JSON.stringify(person));
  }
  getUser(): any {
    return this.userSubject.value;
  }
  getCurrentRole(){
    if(this.isLoggedIn()){
      const user = this.getUser();
      return user?.role?.task_name;
    }
    else{
      return null;
    }

  }
  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  public getToken(): string | null {
    return null;
  }

  // public async getPerson(){
  //   const user = this.getUser();
  //   return await getPersonByUserId(user.objectId)
  //   .then(person => {
  //       if (person) {
  //           console.log("Données de la personne :", person);
  //           return person;
  //       } else {
  //           console.log("Aucune personne trouvée pour cet utilisateur. "+user.objectId);
  //           return null;
  //       }
  //   })
  //   .catch(error => {
  //       console.error("Erreur lors de la récupération des données de la personne :", error);
  //       return null;
  //   });
  // }


  public getPerson(){
    return this.personSubject.value;
  }
}





import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
  setUser(userData: any) {
    this.userSubject.next(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  getUser(): any {
    return this.userSubject.value;
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

}





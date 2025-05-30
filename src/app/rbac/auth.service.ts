import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Step 1 
  //API should return uname and role in object
  mockUser = {
    "username": "Balaji",
    "roles": ["admin"]
  }

  //step 2:
  //use behaviour subject, observable , asobservable
  private currentUser = new BehaviorSubject<any>(null);

  //step 3:
  // create 4 methods login, logout, hasrole, get currentuser

  login(username: string, password: any): Observable<any> {

    const mockUser1 = {
      username,
      roles: username === 'admin' ? ['ADMIN'] : ['USER']
    }
    this.currentUser.next(mockUser1);
    return this.currentUser.asObservable();
  }

  logout() {
    this.currentUser.next(null);
  }

  hasRole(role: string): boolean {
    return this.currentUser.value?.roles.includes(role)
  }

  get currentUsers() {
    return this.currentUser.value;
  }

  constructor() { }


}

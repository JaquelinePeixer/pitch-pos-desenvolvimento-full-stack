import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from './auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // user: AuthUser;

  // constructor(
  //   private http: HttpClient,
  // ) { }

  // loggedUser(): AuthUser {
  //   return this.user || this.getUser()
  // }

  // login(username: string, password: string): Observable<AuthUser> {
  //   return null
  // }

  // logout(): Observable<AuthUser> {

  //   return null
  // }

  // getUser(): AuthUser{
  //   const userString = localStorage.getItem()
  //   return (this.user = JSON.parse(userString))
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from './auth-user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './login.model';
import { config } from '../config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl: string = config.obterUrl();
  user: AuthUser;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  // registerUser(newUser: AuthUser): Observable<AuthUser> {
  //   newUser.id = '';
  //   return this.http.post<AuthUser>(this.apiUrl + '/auth/register', newUser);
  // }

  loginUser(request: Login): Observable<AuthUser> {
    return this.http.post<AuthUser>(this.apiUrl + '/auth/login', request);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('pg_dfs');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  setLocalStorage(data: any) {
    return localStorage.setItem('pg_dfs', JSON.stringify(data));
  }

  loggedUser(): AuthUser {
    return this.user || this.getUser()
  }

  logout() {
    return localStorage.removeItem('pg_dfs');
  }

  getUser(): AuthUser {
    const userString = `${localStorage.getItem('pg_dfs')}`
    return this.user = JSON.parse(userString)
  }

  public logoutRedirect(returnUrl: string, router: Router): boolean {
    this.logout();
    router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } }).then();
    return false;
  }

  isAuthenticatedRefresh() {
    const user = this.loggedUser();
    const tokenExpired = this.jwtHelperService.isTokenExpired(user?.token);
    if (tokenExpired) {
      // fazer função
    }
    return tokenExpired
  }

  checkRole(checkPermission: Array<number>): boolean {
    const permission = checkPermission.filter(x => x !== null);
    if (permission == null || permission.length <= 0) {
      return true;
    }
    const userPermission = this.loggedUser()?.role;
    if (userPermission != null && permission.includes(userPermission)) {
      return true
    }
    return false
  }
}

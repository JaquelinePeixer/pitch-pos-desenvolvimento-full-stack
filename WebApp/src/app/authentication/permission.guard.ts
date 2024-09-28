import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const loggedUser = this.authenticationService.loggedUser();
        
        if (!loggedUser?.token) {
            return this.authenticationService.logoutRedirect(state.url, this.router)
        }

        const isTokenExpired = await this.authenticationService.isAuthenticatedRefresh();
        if (isTokenExpired) {
            return this.authenticationService.logoutRedirect(state.url, this.router)
        }
        
        if (!route.data['role'] || route.data['role'].includes(loggedUser.role)) {           
            return true
        }

        this.router.navigate(['/errors/403']);
        return false
    }
}
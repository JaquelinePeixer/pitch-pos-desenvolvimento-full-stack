import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  
  // const userLogged = AuthenticationService.loggedUser();

  // if(userLogged){
    return true
  // } else {
  //   this.router.navigate(['logn'])
  //   return false
  // }


};

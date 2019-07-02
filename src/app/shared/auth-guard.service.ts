import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(
    //private userService: UserService,
     private router: Router
    ) {}
  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //if (this.userService.isValid()) {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      console.log("AuthGuardService => canActivate() : state RouterStateSnapshot", state);
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }

  }

}

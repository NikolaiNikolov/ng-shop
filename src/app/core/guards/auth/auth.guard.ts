import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthenticationService,
    private router : Router   
  ) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
      return this.checkLoggedIn(route.path);
    }
    
    checkLoggedIn(url : string) : boolean {
      if (this.authService.isLoggedIn()) {
        return true;
      }
  
      this.router.navigate(['/login']);
      return false;
    }
}

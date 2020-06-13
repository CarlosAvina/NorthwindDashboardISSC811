import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

import ROLES from '../utils/roles';

@Injectable({
  providedIn: 'root'
})
export class PieGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    // const tokenPayload = {
    //   rol: ['ROL_PIE']
    // }

    console.log(tokenPayload.rol.some(rol => ROLES.indexOf(rol) >= 0));
    if (!this.auth.isAuthenticated(token) || !tokenPayload.rol.some(rol => ROLES.indexOf(rol) >= 0)) {
      this.router.navigate(['login']);
      return false;
    } else if (!tokenPayload.rol.includes(expectedRole)) {
      this.router.navigate(['barras']);
      return false;
    }

    return true;
  }
}

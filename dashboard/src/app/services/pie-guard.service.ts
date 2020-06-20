import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TokenExpiredService } from './token-expired.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import decode from 'jwt-decode';

import ROLES from '../utils/roles';

@Injectable({
  providedIn: 'root'
})
export class PieGuardService implements CanActivate {

  constructor(public router: Router, public dialog: MatDialog, public tokenChecker: TokenExpiredService) { }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    // const tokenPayload = {
    //   rol: ['ROL_BARRAS', 'ROL_PIE']
    // }

    console.log(tokenPayload.rol.some(rol => ROLES.indexOf(rol) >= 0));
    if (!this.tokenChecker.isTokenExpired() || !tokenPayload.rol.some(rol => ROLES.indexOf(rol) >= 0)) {
      this.router.navigate(['login']);
      return false;
    } else if (!tokenPayload.rol.includes(expectedRole)) {
      this.router.navigate(['barras']);
      this.openDialog();
      return false;
    }

    // this.router.navigate(['pie']);
    return true;
  }
}

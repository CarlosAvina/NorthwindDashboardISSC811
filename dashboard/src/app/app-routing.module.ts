import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { LoginComponent } from './pages/login/login.component';

import { BarrasGuardService as BarrasGuard } from './services/barras-guard.service';
import { PieGuardService as PieGuard } from './services/pie-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'barras', component: Page1Component, canActivate: [BarrasGuard], data: { expectedRole: 'ROL_BARRAS' } },
  { path: 'pie', component: Page2Component, canActivate: [PieGuard], data: { expectedRole: 'ROL_PIE' } },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

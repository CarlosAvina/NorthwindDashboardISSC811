import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';

const routes: Routes = [
    { path: 'barras', component: Page1Component },
    { path: 'pie', component: Page2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

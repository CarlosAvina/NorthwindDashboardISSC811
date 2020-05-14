import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
//   { path: 'inicio', component: InicioComponent },
//   { path: 'acerca-de', component: AcercaDeComponent },
//   { path: 'top5', component: Top5Component },
//   { path: 'histograma', component: HistogramaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

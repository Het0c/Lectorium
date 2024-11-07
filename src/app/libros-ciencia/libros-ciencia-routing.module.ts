import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrosCienciaPage } from './libros-ciencia.page';

const routes: Routes = [
  {
    path: '',
    component: LibrosCienciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrosCienciaPageRoutingModule {}

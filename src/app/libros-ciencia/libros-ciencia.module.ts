import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrosCienciaPageRoutingModule } from './libros-ciencia-routing.module';

import { LibrosCienciaPage } from './libros-ciencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrosCienciaPageRoutingModule
  ],
  declarations: [LibrosCienciaPage]
})
export class LibrosCienciaPageModule {}

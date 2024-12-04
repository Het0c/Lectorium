import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisLibrosPageRoutingModule } from './mis-libros-routing.module';

import { MisLibrosPage } from './mis-libros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisLibrosPageRoutingModule
  ],
  declarations: [MisLibrosPage]
})
export class MisLibrosPageModule {}

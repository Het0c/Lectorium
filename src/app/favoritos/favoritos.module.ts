import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritosRoutingModule } from './favoritos-routing.module';
import { FavoritosPage } from './favoritos.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FavoritosRoutingModule
  ],
  declarations: [FavoritosPage]
})
export class FavoritosModule {}

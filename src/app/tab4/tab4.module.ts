import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


import { Tab4PageRoutingModule } from './tab4-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab4PageRoutingModule,
    ExploreContainerComponentModule
  ],
  declarations: [Tab4Page],
  providers: [BarcodeScanner]
})
export class Tab4PageModule {}

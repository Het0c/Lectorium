import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookPreviewPageRoutingModule } from './book-preview-routing.module';

import { BookPreviewPage } from './book-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookPreviewPageRoutingModule
  ],
  declarations: [BookPreviewPage]
})
export class BookPreviewPageModule {}

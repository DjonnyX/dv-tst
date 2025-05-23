import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageEmptyComponent } from './image-empty.component';



@NgModule({
  declarations: [ImageEmptyComponent],
  exports: [ImageEmptyComponent],
  imports: [
    CommonModule
  ]
})
export class ImageEmptyModule { }

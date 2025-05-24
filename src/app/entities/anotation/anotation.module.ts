import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationComponent } from '../anotation/anotation.component';
import { ImageEmptyModule } from '@entities/image-empty/image-empty.module';


@NgModule({
  declarations: [
    AnotationComponent
  ],
  exports: [AnotationComponent],
  imports: [
    CommonModule,
    ImageEmptyModule,
  ],
})
export class AnotationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationModule as AnotationEntityModule } from '@entities/anotation/anotation.module';
import { AnotationComponent } from '../anotation/anotation.component';


@NgModule({
  declarations: [
    AnotationComponent,
  ],
  exports: [
    AnotationComponent,
  ],
  imports: [
    CommonModule,
    AnotationEntityModule,
  ]
})
export class AnotationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationComponent } from '../anotation/anotation.component';
import { AnotationModule as AnotationEntityModule } from '@entities/anotation/anotation.module';


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

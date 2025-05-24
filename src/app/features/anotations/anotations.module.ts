import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotationsComponent } from '../anotations/anotations.component';
import { AnotationModule } from '@features/anotation/anotation.module';


@NgModule({
  declarations: [
    AnotationsComponent,
  ],
  exports: [
    AnotationsComponent,
  ],
  imports: [
    CommonModule,
    AnotationModule,
  ]
})
export class AnotationsModule { }

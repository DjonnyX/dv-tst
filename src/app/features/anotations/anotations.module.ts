import { NgModule } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AnotationModule } from '@features/anotation/anotation.module';
import { AnotationsComponent } from '../anotations/anotations.component';


@NgModule({
  declarations: [
    AnotationsComponent,
  ],
  exports: [
    AnotationsComponent,
  ],
  imports: [
    CommonModule,
    CdkDrag,
    AnotationModule,
  ],
})
export class AnotationsModule { }

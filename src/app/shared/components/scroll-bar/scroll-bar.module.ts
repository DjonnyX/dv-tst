import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollBarComponent } from './scroll-bar.component';
import { CdkDrag } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ScrollBarComponent],
  exports: [ScrollBarComponent],
  imports: [
    CommonModule,
    CdkDrag,
  ]
})
export class ScrollBarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAreaComponent } from './scroll-area.component';


@NgModule({
  declarations: [
    ScrollAreaComponent,
  ],
  exports: [ScrollAreaComponent],
  imports: [
    CommonModule
  ]
})
export class ScrollAreaModule { }

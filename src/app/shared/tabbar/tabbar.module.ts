import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabbarComponent } from '../tabbar/tabbar.component';



@NgModule({
  declarations: [
    TabbarComponent,
  ],
  exports: [
    TabbarComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class TabbarModule { }

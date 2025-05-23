import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoadingIndicatorComponent } from './page-loading-indicator.component';
import { SpinnerModule } from '@entities/spinner/spinner.module'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PageLoadingIndicatorComponent
  ],
  exports: [
    PageLoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
  ]
})
export class PageLoadingIndicatorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';


@NgModule({
  declarations: [
    DocumentComponent
  ],
  exports: [DocumentComponent],
  imports: [
    CommonModule,
  ]
})
export class DocumentModule { }

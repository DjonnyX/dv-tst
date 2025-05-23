import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentModule as DocumentEntityModule } from '@entities/document/document.module';
import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';


@NgModule({
  declarations: [
    DocumentComponent
  ],
  imports: [
    CommonModule,
    DocumentEntityModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerPageListPageComponent } from './components/document-viewer-page-list-page/document-viewer-page-list-page.component';

@NgModule({
  declarations: [DocumentViewerPageListPageComponent],
  exports: [DocumentViewerPageListPageComponent],
  imports: [
    CommonModule
  ]
})
export class DocumentViewerModule { }

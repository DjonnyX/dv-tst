import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerModule as DocumentViewerFeatureModule } from '@features/document-viewer/document-viewer.module';
import { DocumentViewerComponent } from './document-viewer.component';
import { DocumentViewerService } from '@features/document-viewer/document-viewer.service';

@NgModule({
  declarations: [DocumentViewerComponent],
  exports: [DocumentViewerComponent],
  imports: [
    CommonModule,
    DocumentViewerFeatureModule,
  ]
})
export class DocumentViewerModule {
  constructor(private _service: DocumentViewerService) { }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerModule as DocumentViewerWidgetModule } from '@widgets/document-viewer/document-viewer.module';
import { DocumentViewerRoutingModule } from './document-viewer-routing.module';
import { DocumentViewerComponent } from './document-viewer.component';
import { SpinnerModule } from "../../entities/spinner/spinner.module";


@NgModule({
  declarations: [
    DocumentViewerComponent
  ],
  imports: [
    CommonModule,
    DocumentViewerWidgetModule,
    DocumentViewerRoutingModule,
    SpinnerModule
]
})
export class DocumentViewerModule { }

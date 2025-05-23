import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentViewerModule as DocumentViewerEntityModule } from '@entities/document-viewer/document-viewer.module';
import { SpinnerModule } from '@entities/spinner/spinner.module';
import { ImageViewerModule } from '@features/image-viewer/image-viewer.module';
import { DocumentViewerService } from './document-viewer.service';
import { DocumentViewerImplimentationService } from './document-viewer.implimentation.service';
import { DocumentViewerMockService } from './document-viewer.mock.service';
import { DocumentViewerComponent } from './document-viewer.component';
import { DocumentViewerPageListComponent } from './components/document-viewer-page-list/document-viewer-page-list.component';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    DocumentViewerComponent,
    DocumentViewerPageListComponent,
  ],
  exports: [DocumentViewerComponent],
  imports: [
    CommonModule,
    DocumentViewerEntityModule,
    ImageViewerModule,
    SpinnerModule,
  ],
  providers: [{
    provide: DocumentViewerService,
    useClass: environment.useMock ? DocumentViewerMockService : DocumentViewerImplimentationService
  }]
})
export class DocumentViewerModule { }

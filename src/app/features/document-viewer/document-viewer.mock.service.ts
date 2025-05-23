import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { DocumentViewerService } from './document-viewer.service';
import { IDocumentModel } from '../../entities/document-viewer/models';
import { DOCUMENT_MOCK, IMAGE_1_MOCK, IMAGE_2_MOCK, IMAGE_3_MOCK, IMAGE_4_MOCK, IMAGE_5_MOCK } from './mock';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerMockService extends DocumentViewerService {

  constructor() {
    super();
  }

  override getDocument(docUrl: string): Observable<IDocumentModel | undefined> {
    return this._loadMock(DOCUMENT_MOCK)
  }

  override getImageAsBase64(imageUrl: string): Observable<string | null> {
    switch (imageUrl) {
      case 'pages/1.png':
        return this._loadMock(IMAGE_1_MOCK);
      case 'pages/2.png':
        return this._loadMock(IMAGE_2_MOCK);
      case 'pages/3.png':
        return this._loadMock(IMAGE_3_MOCK);
      case 'pages/4.png':
        return this._loadMock(IMAGE_4_MOCK);
      case 'pages/5.png':
        return this._loadMock(IMAGE_5_MOCK);
    }

    return of(null);
  }

  private _loadMock(mock: string | any) {
    return of(mock).pipe(delay(this._getDelay()));
  }

  private _getDelay() {
    return 500 + (Math.random() * 2500);
  }
}

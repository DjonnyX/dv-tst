import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentModel } from '../../entities/document-viewer/models';
import { DocumentViewerService } from './document-viewer.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerImplimentationService extends DocumentViewerService {
  constructor(private _http: HttpClient) {
    super();
  }

  protected loadImageAsByteArray(imageUrl: string): Observable<ArrayBuffer> {
    return this._http.get(imageUrl, { responseType: 'arraybuffer' });
  }

  override save(document: IDocumentModel) {
    throw new Error('Method not implemented.');
  }

  override getDocument(docUrl: string): Observable<IDocumentModel | undefined> {
    throw new Error('Method not implemented.');
  }

  override getImageAsBase64(imageUrl: string): Observable<string | null> {
    throw new Error('Method not implemented.');
  }
}

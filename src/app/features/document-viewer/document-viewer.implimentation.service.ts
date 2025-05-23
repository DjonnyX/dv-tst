import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentModel } from '../../entities/document-viewer/models';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerImplimentationService {
  constructor(private _http: HttpClient) { }

  protected loadImageAsByteArray(imageUrl: string): Observable<ArrayBuffer> {
    return this._http.get(imageUrl, { responseType: 'arraybuffer' });
  }

  getDocument(docUrl: string): Observable<IDocumentModel | undefined> {
    throw new Error('Method not implemented.');
  }

  getImageAsBase64(imageUrl: string): Observable<string | null> {
    throw new Error('Method not implemented.');
  }
}

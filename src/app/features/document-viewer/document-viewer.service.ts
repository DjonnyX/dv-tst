import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDocumentModel } from '../../entities/document-viewer/models';

@Injectable({
  providedIn: 'root'
})
export abstract class DocumentViewerService {
  getDocument(docUrl: string | null | undefined): Observable<IDocumentModel | undefined> {
    return of()
  }
  getImageAsBase64(imageUrl: string | undefined): Observable<string | null> {
    return of(null);
  }
  save(document: IDocumentModel) { }
}

import { Component, effect, input, output, signal } from '@angular/core';
import { IDocumentModel } from '@entities/document-viewer/models';
import { DocumentViewerService } from './document-viewer.service';
import { finalize, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AnotationsService } from '@features/anotations/anotations.service';

@Component({
  selector: 'dv-document-viewer-feature',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss'
})
export class DocumentViewerComponent {
  pageNumber = signal<number | undefined>(undefined);

  pageImage = signal<string | null | undefined>(undefined);

  isLoading = signal<boolean>(false);

  base64ImgUrl = signal<string | null | undefined>(undefined);

  document = input<IDocumentModel | null | undefined>(undefined);

  select = output<number>();

  constructor(private _service: DocumentViewerService, private _anotationsService: AnotationsService) {
    effect(() => {
      const pageNumber = this.pageNumber();
      this.isLoading.set(true);

      const page = this.document()?.pages.find(v => v.number === pageNumber);
      this.base64ImgUrl.set(page?.imageUrl);

      if (pageNumber !== undefined) {
        this.select.emit(pageNumber);
      }
    });

    effect(() => {
      const image = this.pageImage(), number = this.pageNumber(), doc = this.document();
      if (doc && doc?.pages) {
        const anotations = doc?.pages.find(v => v.number === number)?.anotations;
        if (Array.isArray(anotations)) {
          this._anotationsService.load(anotations);
        } else {
          this._anotationsService.clear();
        }
      }
    });

    effect(() => {
      const doc = this.document();
      if (doc && Array.isArray(doc.pages) && doc.pages.length > 0) {
        const number = doc.pages[0].number;

        this.pageNumber.set(number);

        this.select.emit(number);
      }
    });

    const imgUrl$ = toObservable(this.base64ImgUrl);

    imgUrl$.pipe(
      switchMap(url => {
        return this._service.getImageAsBase64(url || undefined).pipe(
          finalize(() => {
            this.isLoading.set(false);
          })
        )
      }),
      tap(v => {
        this.pageImage.set(v);
      }),
    ).subscribe();
  }

  onSelectHandler(number: number) {
    this.pageNumber.set(number);
  }

  protected _snapshotDocument() {
    const anotations = this._anotationsService.toArray(),
      number = this.pageNumber(),
      doc = this.document();
    if (doc?.pages) {
      const page = doc?.pages.find(v => v.number === number);
      if (page && Array.isArray(anotations)) {
        page.anotations = anotations;
      }
    }

    return doc;
  }

  onSaveHandler() {
    const doc = this._snapshotDocument();

    if (!doc) {
      console.group('Saved document:');
      console.error('Empty document');
      console.groupEnd();
      return;
    }

    this._service.save(doc);

    console.group('Saved document:');
    console.info(doc);
    console.groupEnd();
  }
}

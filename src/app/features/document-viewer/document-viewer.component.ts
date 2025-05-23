import { Component, DestroyRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDocumentModel } from '@entities/document-viewer/models';
import { DocumentViewerService } from './document-viewer.service';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dv-document-viewer-feature',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss'
})
export class DocumentViewerComponent implements OnInit {
  @Input()
  document: IDocumentModel | null | undefined;

  private _pageNumber$ = new BehaviorSubject<number | undefined>(undefined);
  pageNumber$ = this._pageNumber$.asObservable();

  private _pageImage$ = new BehaviorSubject<string | null | undefined>(undefined);
  pageImage$ = this._pageImage$.asObservable();

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading$.asObservable();

  @Output()
  select = new EventEmitter<number>();

  constructor(private _service: DocumentViewerService, private _destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this._pageNumber$.pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap(number => {
        this._isLoading$.next(true);
        const page = this.document?.pages.find(v => v.number === number);
        return this._service.getImageAsBase64(page?.imageUrl).pipe(
          finalize(() => {
            this._isLoading$.next(false);
          })
        );
      }),
    ).subscribe(img => {
      this._pageImage$.next(img);
    });
  }

  onSelectHandler(number: number) {
    this._pageNumber$.next(number);

    this.select.emit(number);
  }
}

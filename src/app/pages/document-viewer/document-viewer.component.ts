import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DocumentViewerService } from '@features/document-viewer/document-viewer.service';
import { IDocumentModel } from '@entities/document-viewer/models';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'dv-document-viewer',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit {
  documentId: string | null | undefined;

  private _document$ = new BehaviorSubject<IDocumentModel | null>(null);
  get document$() { return this._document$.asObservable() }

  private _isLoading$ = new BehaviorSubject<boolean>(true);
  get isLoading$() { return this._isLoading$.asObservable() }

  constructor(private _route: ActivatedRoute, private _service: DocumentViewerService, private _destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.documentId = this._route.snapshot.paramMap.get('documentId');

    this._service.getDocument(this.documentId).pipe(
      takeUntilDestroyed(this._destroyRef),
      finalize(() => { this._isLoading$.next(false) })
    ).subscribe(doc => {
      this._document$.next(doc ?? null);
    });
  }
}

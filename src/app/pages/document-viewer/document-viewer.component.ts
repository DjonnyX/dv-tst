import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DocumentViewerService } from '@features/document-viewer/document-viewer.service';
import { IDocumentModel } from '@entities/document-viewer/models';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'dv-document-viewer',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit {
  documentId = signal<string | null | undefined>(undefined);

  document = signal<IDocumentModel | null>(null);

  isLoading = signal<boolean>(true);

  constructor(private _route: ActivatedRoute, private _service: DocumentViewerService, private _destroyRef: DestroyRef) {
    const documentId$ = toObservable(this.documentId);

    documentId$.pipe(
      switchMap(documentId => {
        return this._service.getDocument(documentId).pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => { this.isLoading.set(false) })
        )
      })
    ).subscribe(doc => {
      this.document.set(doc ?? null);
    });
  }

  ngOnInit(): void {
    this.documentId.set(this._route.snapshot.paramMap.get('documentId'));
  }
}

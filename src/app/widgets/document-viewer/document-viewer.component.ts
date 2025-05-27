import { ChangeDetectionStrategy, Component, inject, input, Input } from '@angular/core';
import { IDocumentModel } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-document-viewer-widget',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent {
  document = input<IDocumentModel | null | undefined>(undefined);

  constructor() { }
}

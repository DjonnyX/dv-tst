import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DocumentViewerService } from '@features/document-viewer/document-viewer.service';
import { IDocumentModel } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-document-viewer-widget',
  standalone: false,
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent {
  @Input()
  document: IDocumentModel | null | undefined;

  constructor(private _service: DocumentViewerService) { }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IDocumentPageModel } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-document-viewer-page-list',
  standalone: false,
  templateUrl: './document-viewer-page-list.component.html',
  styleUrl: './document-viewer-page-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewerPageListComponent {
  @Input()
  pages: Array<IDocumentPageModel> | undefined;

  @Input()
  selected: number | null | undefined;

  @Output()
  select = new EventEmitter<number>();

  onClickHandler(number: number) {
    this.selected = number;

    this.pages = [...(this.pages || [])];

    this.select.emit(number);
  }
}

import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { IDocumentPageModel } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-document-viewer-page-list',
  standalone: false,
  templateUrl: './document-viewer-page-list.component.html',
  styleUrl: './document-viewer-page-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewerPageListComponent {
  pages = input<Array<IDocumentPageModel> | undefined>(undefined);

  selected = input<number | null | undefined>(undefined);

  select = output<number>();

  pageList = signal<Array<IDocumentPageModel> | undefined>(undefined);

  number = signal<number | null | undefined>(undefined);

  constructor() {
    effect(() => {
      const pages = this.pages();
      this.pageList.set(pages);
    });

    effect(() => {
      const selected = this.selected();
      this.number.set(selected);
    });

    effect(() => {
      const number = this.number();

      if (number === null || number === undefined) {
        return;
      }

      const pages = this.pages();
      this.pageList.set([...(pages || [])]);

      this.select.emit(number);
    })
  }

  onClickHandler(number: number) {
    this.number.set(number);
  }
}

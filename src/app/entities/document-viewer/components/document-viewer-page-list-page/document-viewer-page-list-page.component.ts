import { Component, input } from '@angular/core';

@Component({
  selector: 'dv-document-viewer-page-list-page',
  standalone: false,
  templateUrl: './document-viewer-page-list-page.component.html',
  styleUrl: './document-viewer-page-list-page.component.scss'
})
export class DocumentViewerPageListPageComponent {
  number = input<number | undefined>();

  selected = input<boolean>(false);
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'dv-document-viewer-page-list-page',
  standalone: false,
  templateUrl: './document-viewer-page-list-page.component.html',
  styleUrl: './document-viewer-page-list-page.component.scss'
})
export class DocumentViewerPageListPageComponent {
  @Input()
  number: number | undefined;

  @Input()
  selected: boolean = false;
}

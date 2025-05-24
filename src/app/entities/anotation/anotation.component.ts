import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnotationContentType } from '../document-viewer/enums';
import { AnotationMode } from './enums';
import { IAnotation } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-anotation-entity',
  standalone: false,
  templateUrl: './anotation.component.html',
  styleUrl: './anotation.component.scss'
})
export class AnotationComponent {
  @Input() mode: AnotationMode | string = AnotationMode.SAVED;

  @Input() contentType: AnotationContentType = AnotationContentType.TEXT;

  @Input() data: string | undefined;

  @Output() create = new EventEmitter<Omit<IAnotation, 'x' | 'y'>>();

  @Output() delete = new EventEmitter<void>();

  onCreateHandler() {
    this.create.emit({
      data: this.data, contentType: this.contentType,
    });
  }

  onDeleteHandler() {
    this.delete.emit();
  }
}

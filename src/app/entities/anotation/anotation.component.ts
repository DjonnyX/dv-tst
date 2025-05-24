import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnotationContentType } from '../document-viewer/enums';
import { AnotationMode } from './enums';
import { IAnotation } from '@entities/document-viewer/models';
import { COLORS } from './const';

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

  @Input() color: string = COLORS[0];

  @Output() edit = new EventEmitter<void>();

  @Output() delete = new EventEmitter<void>();

  onEditHandler() {
    this.edit.emit();
  }

  onDeleteHandler() {
    this.delete.emit();
  }
}

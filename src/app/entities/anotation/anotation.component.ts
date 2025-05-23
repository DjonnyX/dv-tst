import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnotationContentType } from './enums';

@Component({
  selector: 'dv-anotation',
  standalone: false,
  templateUrl: './anotation.component.html',
  styleUrl: './anotation.component.scss'
})
export class AnotationComponent {
  @Input() contentType: AnotationContentType = AnotationContentType.TEXT;

  @Input() data: string | undefined;

  @Output() delete = new EventEmitter<void>();

  onDeleteHandler() {
    this.delete.emit();
  }
}

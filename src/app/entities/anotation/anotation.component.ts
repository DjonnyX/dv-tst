import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnotationContentType } from '../document-viewer/enums';
import { AnotationMode } from './enums';
import { COLORS } from './const';
import { AnotationsService } from '@features/anotations/anotations.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'dv-anotation-entity',
  standalone: false,
  templateUrl: './anotation.component.html',
  styleUrl: './anotation.component.scss'
})
export class AnotationComponent {
  @Input() index = -1;

  @Input() mode: AnotationMode | string = AnotationMode.SAVED;

  @Input() contentType: AnotationContentType = AnotationContentType.TEXT;

  @Input() data: string | undefined;

  @Input() color: string = COLORS[0];

  @Output() edit = new EventEmitter<AnotationContentType>();

  @Output() delete = new EventEmitter<void>();

  constructor(private _service: AnotationsService) {
    this._service.edit$.pipe(
      takeUntilDestroyed(),
      filter(v => {
        return v.index === this.index;
      })
    ).subscribe(v => {
      this.onEditHandler();
    });
  }

  onEditHandler() {
    this.edit.emit(this.contentType);
  }

  onDeleteHandler() {
    this.delete.emit();
  }
}

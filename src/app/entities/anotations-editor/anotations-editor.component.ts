import { Component, EventEmitter, Input, Output } from '@angular/core';
import { COLORS } from '@entities/anotation/const';
import { AnotationMode } from '@entities/anotation/enums';
import { AnotationContentType } from '@entities/document-viewer/enums';
import { IAnotation } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-anotations-editor',
  standalone: false,
  templateUrl: './anotations-editor.component.html',
  styleUrl: './anotations-editor.component.scss'
})
export class AnotationsEditorComponent {
  @Input() mode: AnotationMode | string = AnotationMode.SAVED;

  private _contentType: AnotationContentType = AnotationContentType.TEXT;
  @Input()
  set contentType(v: AnotationContentType) {
    if (this._contentType === v) {
      return;
    }

    this._contentType = v;
  }
  get contentType() { return this._contentType; }

  @Input() data: string | undefined;

  @Input() color: string = COLORS[0];

  @Output() create = new EventEmitter<Omit<IAnotation, 'x' | 'y'>>();

  @Output() delete = new EventEmitter<void>();

  onCreateHandler() {
    const anotationData = {
      data: this.data, contentType: this.contentType,
    };

    this.create.emit(anotationData);
  }

  onEditingComplete() {
    if (!this.data || this.data === '') {
      return;
    }

    this.onCreateHandler();
  }

  onDeleteHandler() {
    this.delete.emit();
  }

  onTextAreaClickHandler(e: MouseEvent) {
    e.stopImmediatePropagation();
  }
}

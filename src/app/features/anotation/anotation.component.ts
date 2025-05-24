import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAnotation } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-anotation',
  standalone: false,
  templateUrl: './anotation.component.html',
  styleUrl: './anotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotationComponent {
  private _data!: IAnotation;
  @Input()
  set data(v: IAnotation) {
    if (this._data === v) {
      return;
    }

    this._data = v;

    this._cdr.markForCheck();
  }
  get data() {
    return this._data;
  }

  private _zoom: number = 1;
  @Input()
  set zoom(v: number) {
    if (this._zoom === v) {
      return;
    }

    this._zoom = v;

    this._cdr.markForCheck();
  }
  get zoom() {
    return this._zoom;
  }

  @Output()
  delete = new EventEmitter<IAnotation>();

  constructor(private _cdr: ChangeDetectorRef) { }

  onDeleteHandler() {
    this.delete.emit(this._data);
  }
}

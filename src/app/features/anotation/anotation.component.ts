import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnotationMode } from '@entities/anotation/enums';
import { IAnotation } from '@entities/document-viewer/models';

@Component({
  selector: 'dv-anotation',
  standalone: false,
  templateUrl: './anotation.component.html',
  styleUrl: './anotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotationComponent implements OnInit {
  private _mode: AnotationMode | string = AnotationMode.SAVED;
  @Input()
  set mode(v: AnotationMode | string) {
    if (this._mode === v) {
      return;
    }

    this._mode = v;

    this._cdr.markForCheck();
  }
  get mode() {
    return this._mode;
  }

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

  private _color!: string;
  @Input()
  set color(v: string) {
    if (this._color === v) {
      return;
    }

    this._color = v;

    this._cdr.markForCheck();
  }
  get color() {
    return this._color;
  }

  private _isEdit = false;
  @Input()
  set isEdit(v: boolean) {
    if (this._isEdit === v) {
      return;
    }

    this._isEdit = v;

    this._cdr.markForCheck();
  }
  get isEdit() {
    return this._isEdit;
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
  create = new EventEmitter<IAnotation>();

  @Output()
  edit = new EventEmitter<IAnotation>();

  @Output()
  delete = new EventEmitter<IAnotation>();

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.isEdit = this._mode === AnotationMode.NEW;
  }

  onCreateHandler(data: Omit<IAnotation, 'x' | 'y'>) {
    const anotationData = {
      ...this._data,
      ...data,
    };
    if (this._mode === AnotationMode.NEW) {
      this.create.emit(anotationData);
    } else {
      this._isEdit = false;

      this.edit.emit(anotationData);
    }
  }

  onEditHandler() {
    this._isEdit = true;

    this.edit.emit(this._data);
  }

  onDeleteHandler() {
    this.delete.emit(this._data);
  }
}

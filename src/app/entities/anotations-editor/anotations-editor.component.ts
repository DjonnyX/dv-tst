import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { COLORS } from '@entities/anotation/const';
import { TABS } from '@entities/anotation/const/tabs';
import { AnotationMode } from '@entities/anotation/enums';
import { AnotationContentType } from '@entities/document-viewer/enums';
import { IAnotation } from '@entities/document-viewer/models';
import { ITab, ITabSelect } from '@shared/tabbar/models';

const BASE64_IMG_PREFIX = "data:image/png;base64";

@Component({
  selector: 'dv-anotations-editor',
  standalone: false,
  templateUrl: './anotations-editor.component.html',
  styleUrl: './anotations-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotationsEditorComponent implements AfterViewInit {
  @ViewChild('textarea')
  textarea: ElementRef<HTMLTextAreaElement> | undefined;

  @Input() index = -1;

  @Input() mode: AnotationMode | string = AnotationMode.SAVED;

  private _contentType: AnotationContentType = AnotationContentType.TEXT;
  @Input()
  set contentType(v: AnotationContentType) {
    if (this._contentType === v) {
      return;
    }

    this._contentType = v;

    this._cdr.markForCheck();
  }
  get contentType() { return this._contentType; }

  src: string | null | undefined;

  private _data: string | null | undefined;
  @Input()
  set data(v: string | null | undefined) {
    if (this._data === v) {
      return;
    }

    this._data = this.src = v;
  }
  get data() {
    return this._data;
  }

  @Input() color: string = COLORS[0];

  @Output() create = new EventEmitter<Omit<IAnotation, 'x' | 'y'>>();

  @Output() edit = new EventEmitter<AnotationContentType>();

  @Output() delete = new EventEmitter<void>();

  tabs: Array<ITab> = TABS;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    }
  }

  onImageLoadedHandler(data: string | null) {
    this._data = this.src = data;

    const anotationData = {
      data: data, contentType: this.contentType,
    };

    this.create.emit(anotationData);
  }

  onSelectTab(data: ITabSelect) {
    this.contentType = data.index === 0 ? AnotationContentType.TEXT : AnotationContentType.IMAGE;

    this._cdr.detectChanges();
  }

  onCreateHandler() {
    const anotationData = {
      data: this.data, contentType: this.contentType,
    };

    this.create.emit(anotationData);
  }

  onAutoComplete() {
    if (this._contentType === AnotationContentType.IMAGE) {
      return;
    }

    this.onEditingComplete();
  }

  onEditingComplete(emitOnlyText = false) {
    this._data = this.src;

    if (!this.data || this.data === '') {
      return;
    }

    if (!emitOnlyText || (emitOnlyText && this._contentType === AnotationContentType.TEXT)) {
      this.onCreateHandler();
    }
  }

  onDeleteHandler() {
    this.delete.emit();
  }

  onTextAreaClickHandler(e: MouseEvent) {
    e.stopImmediatePropagation();
  }
}

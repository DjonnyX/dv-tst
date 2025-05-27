import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { COLORS } from '@entities/anotation/const';
import { TABS } from '@entities/anotation/const/tabs';
import { AnotationMode } from '@entities/anotation/enums';
import { AnotationContentType } from '@entities/document-viewer/enums';
import { IAnotation } from '@entities/document-viewer/models';
import { ITab, ITabSelect } from '@shared/tabbar/models';

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

  index = input<number>(-1);

  mode = input<AnotationMode | string>(AnotationMode.SAVED);

  contentType = input<AnotationContentType>(AnotationContentType.TEXT);

  src: string | null | undefined;

  data = input<string | null | undefined>(undefined);

  color = input<string>(COLORS[0]);

  create = output<Omit<IAnotation, 'x' | 'y'>>();

  edit = output<AnotationContentType>();

  delete = output<void>();

  typeOfContent = signal<AnotationContentType>(AnotationContentType.TEXT);

  tabs: Array<ITab> = TABS;

  constructor() {
    effect(() => {
      const contentType = this.contentType();
      this.typeOfContent.set(contentType);
    });

    effect(() => {
      const data = this.data();
      this.src = data;
    });
  }

  ngAfterViewInit(): void {
    if (this.textarea) {
      this.textarea.nativeElement.focus();
    }
  }

  onImageLoadedHandler(data: string | null | undefined) {
    this.src = data;

    const anotationData = {
      data: data, contentType: this.typeOfContent(),
    };

    this.create.emit(anotationData);
  }

  onSelectTab(data: ITabSelect) {
    this.typeOfContent.set(data.index === 0 ? AnotationContentType.TEXT : AnotationContentType.IMAGE);
  }

  onCreateHandler() {
    const anotationData = {
      data: this.src, contentType: this.typeOfContent(),
    };

    this.create.emit(anotationData);
  }

  onAutoComplete() {
    if (this.contentType() === AnotationContentType.IMAGE) {
      return;
    }

    // etc
  }

  onEditingComplete(emitOnlyText = false) {
    if (!this.src || this.src === '') {
      return;
    }

    if (!emitOnlyText || (emitOnlyText && this.typeOfContent() === AnotationContentType.TEXT)) {
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

import { Component, DestroyRef, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { file2Base64 } from '@shared/utils';
import { BehaviorSubject, catchError, from } from 'rxjs';

@Component({
  selector: 'dv-anotation-image-editor',
  standalone: false,
  templateUrl: './anotation-image-editor.component.html',
  styleUrl: './anotation-image-editor.component.scss'
})
export class AnotationImageEditorComponent {
  @ViewChild('imagePicker')
  imagePicker: ElementRef<HTMLInputElement> | undefined;

  @Input()
  src: string | null | undefined;

  @Output()
  loaded = new EventEmitter<string | null>();

  error: boolean = false;

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading$.asObservable();

  constructor(private _destroyRef: DestroyRef) { }

  private _load(file: File) {
    from(file2Base64(file)).pipe(
      takeUntilDestroyed(this._destroyRef),
      catchError(err => {
        this.error = true;
        throw err;
      })
    ).subscribe(v => {
      this.src = v;
      this.error = false;

      this.loaded.next(this.src);
    });
  }

  onSelectImageHandler(e: Event) {
    e.stopImmediatePropagation();

    this.pick();
  }

  onImageLoadingErrorHandler() {
    this.error = true;
  }

  pick() {
    if (!this.imagePicker) {
      return;
    }

    this.imagePicker.nativeElement.click();
  }

  onFileSelectedHandler(event: Event) {
    if (!this.imagePicker) {
      return;
    }

    if (this.imagePicker.nativeElement.files?.length) {
      const file = this.imagePicker.nativeElement.files[0];

      if (file) {
        this._load(file);
      }

      this.clearPicker();
    }
  }

  onFileSelectCanceledHandler() {
    this.clearPicker();
  }

  clearPicker() {
    if (!this.imagePicker) {
      return;
    }

    this.imagePicker.nativeElement.value = '';
  }
}

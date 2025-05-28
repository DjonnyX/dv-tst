import { Component, computed, DestroyRef, effect, ElementRef, inject, input, output, Signal, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { file2Base64 } from '@shared/utils';
import { catchError, filter, finalize, from, switchMap, tap } from 'rxjs';

@Component({
  selector: 'dv-anotation-image-editor',
  standalone: false,
  templateUrl: './anotation-image-editor.component.html',
  styleUrl: './anotation-image-editor.component.scss'
})
export class AnotationImageEditorComponent {
  @ViewChild('imagePicker')
  imagePicker: ElementRef<HTMLInputElement> | undefined;

  src = input<string | null | undefined>(undefined);

  data = signal<string | null | undefined>(undefined);

  sanitizedData: Signal<SafeUrl | null>;

  loaded = output<string | null | undefined>();

  file = signal<File | undefined>(undefined);

  error: boolean = false;

  isLoading = signal<boolean>(false);

  private _destroyRef = inject(DestroyRef);

  private _sanitizer = inject(DomSanitizer);

  constructor() {
    this.sanitizedData = computed(() => {
      const data = this.data();
      return data ? this._sanitizer.bypassSecurityTrustUrl(data) : null;
    });

    const effectRef = effect(() => {
      const src = this.src();

      this.data.set(src);

      effectRef.destroy();
    }, { manualCleanup: true });

    effect(() => {
      const d = this.data;
      this.error = false;
    });

    const file$ = toObservable(this.file);

    file$.pipe(
      filter(v => !!v),
      tap(() => {
        this.isLoading.set(true);
      }),
      switchMap(file => {
        return from(file2Base64(file)).pipe(
          takeUntilDestroyed(this._destroyRef),
          catchError(err => {
            this.error = true;
            throw err;
          })
        )
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    ).subscribe(v => {
      this.data.set(v);

      this.loaded.emit(v);
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
        this.file.set(file);
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

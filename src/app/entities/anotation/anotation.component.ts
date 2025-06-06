import { Component, computed, inject, input, output, Signal } from '@angular/core';
import { AnotationContentType } from '../document-viewer/enums';
import { AnotationMode } from './enums';
import { COLORS } from './const';
import { AnotationsService } from '@features/anotations/anotations.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'dv-anotation-entity',
  standalone: false,
  templateUrl: './anotation.component.html',
  styleUrl: './anotation.component.scss'
})
export class AnotationComponent {
  index = input<number>(-1);

  mode = input<AnotationMode | string>(AnotationMode.SAVED);

  contentType = input<AnotationContentType>(AnotationContentType.TEXT);

  data = input<string | null | undefined>(undefined);

  sanitizedData: Signal<SafeUrl | null>;

  color = input<string>(COLORS[0]);

  edit = output<AnotationContentType>();

  delete = output<void>();

  private _service = inject(AnotationsService);

  private _sanitizer = inject(DomSanitizer);

  constructor() {
    this.sanitizedData = computed(() => {
      const data = this.data();
      return data ? this._sanitizer.bypassSecurityTrustUrl(data) : null;
    });

    this._service.edit$.pipe(
      takeUntilDestroyed(),
      filter(v => {
        return v.index === this.index();
      })
    ).subscribe(v => {
      this.onEditHandler();
    });
  }

  onEditHandler(e?: Event) {
    if (e) {
      e.stopImmediatePropagation();
    }

    this.edit.emit(this.contentType());
  }

  onDeleteHandler() {
    this.delete.emit();
  }
}

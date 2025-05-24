import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { AnotationsService } from './anotations.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAnotation } from '@entities/document-viewer/models';
import { AnotationContentType } from '@entities/document-viewer/enums';

@Component({
  selector: 'dv-anotations',
  standalone: false,
  templateUrl: './anotations.component.html',
  styleUrl: './anotations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotationsComponent {
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

  anotations = new Array<IAnotation>();

  newAnotation: IAnotation | null | undefined;

  constructor(private _service: AnotationsService, private _cdr: ChangeDetectorRef) {
    this._service.show$.pipe(
      takeUntilDestroyed(),
    ).subscribe(v => {
      this.anotations = v;

      this._cdr.markForCheck();
    });

    this._service.add$.pipe(
      takeUntilDestroyed(),
    ).subscribe(v => {
      this.newAnotation = {
        contentType: AnotationContentType.TEXT,
        data: '',
        ...v
      };

      this._cdr.markForCheck();
    });
  }

  onCreateHandler(anotation: IAnotation) {
    this._service.create(anotation);

    this.newAnotation = null;

    this._cdr.markForCheck();
  }

  onDeleteHandler(index: number, anotation: IAnotation) {
    this._service.delete(index, anotation);
  }

  onDeleteNewAnotationHandler() {
    this.newAnotation = null;

    this._cdr.markForCheck();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { AnotationsService } from './anotations.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAnotation } from '@entities/document-viewer/models';
import { AnotationContentType } from '@entities/document-viewer/enums';
import { COLORS } from '@entities/anotation/const';
import { IRectangle } from './models';
import { CdkDragEnd, CdkDragEnter } from '@angular/cdk/drag-drop';

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

  private _contentBounds!: IRectangle;
  @Input()
  set contentBounds(v: IRectangle) {
    if (this._contentBounds === v) {
      return;
    }

    this._contentBounds = v;

    this._cdr.markForCheck();
  }
  get contentBounds() {
    return this._contentBounds;
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

  getColor(index: number) {
    if (index < 0) {
      return COLORS[0];
    }

    let i = index >= COLORS.length ? index - COLORS.length : index;

    while (i >= COLORS.length) {
      i = index - COLORS.length;
    }

    return COLORS[i];
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

  onDropHandler(index: number, event: CdkDragEnd) {
    if (index === -1) {
      const data = this.newAnotation;
      if (!data) {
        return;
      }

      this.newAnotation = {
        ...data,
        x: data.x + event.distance.x / this._zoom,
        y: data.y + event.distance.y / this._zoom,
      };
    } else {
      const data = this.anotations[index];
      if (!data) {
        return;
      }

      this.anotations = [...this.anotations];

      this.anotations[index] = {
        ...data,
        x: data.x + event.distance.x / this._zoom,
        y: data.y + event.distance.y / this._zoom,
      };
    }

    this._cdr.markForCheck();
  }
}

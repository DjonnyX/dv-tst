import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { AnotationsService } from './anotations.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAnotation } from '@entities/document-viewer/models';
import { AnotationContentType } from '@entities/document-viewer/enums';
import { COLORS } from '@entities/anotation/const';
import { IRectangle } from './models';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dv-anotations',
  standalone: false,
  templateUrl: './anotations.component.html',
  styleUrl: './anotations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnotationsComponent {
  zoom = input<number>(1);

  contentBounds = input.required<IRectangle>();

  anotations = signal<Array<IAnotation>>([]);

  newAnotation = signal<IAnotation | null | undefined>(undefined);

  private _service = inject(AnotationsService);

  constructor() {
    this._service.show$.pipe(
      takeUntilDestroyed(),
    ).subscribe(v => {
      this.anotations.set(v);
    });

    this._service.add$.pipe(
      takeUntilDestroyed(),
    ).subscribe(v => {
      this.newAnotation.set({
        contentType: AnotationContentType.TEXT,
        data: '',
        ...v
      });
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

  onCreateHandler(index: number, anotation: IAnotation) {
    if (index === -1) {
      this._service.create({
        ...this.newAnotation,
        ...anotation,
      });
    } else {
      const anotations = this.anotations(),
        last = {
          ...anotations[index],
          ...anotation,
        };
      this._service.create(last);
    }

    this.newAnotation.set(null);
  }

  onEditHandler(index: number, anotation: IAnotation) {
    this._service.edit(index, anotation);

    this.newAnotation.set(null);
  }

  onDeleteHandler(index: number, anotation: IAnotation) {
    this._service.delete(index, anotation);
  }

  onDeleteNewAnotationHandler() {
    this.newAnotation.set(null);
  }

  onDropHandler(index: number, event: CdkDragEnd) {
    const zoom = this.zoom();
    if (index === -1) {
      const data = this.newAnotation();
      if (!data) {
        return;
      }

      this.newAnotation.set({
        ...data,
        x: data.x + event.distance.x / zoom,
        y: data.y + event.distance.y / zoom,
      });
    } else {
      this.anotations.update(v => {
        if (!v) {
          return v;
        }

        const data = v[index];
        if (!data) {
          return [];
        }

        const result = [...v];

        result[index] = {
          ...data,
          x: data.x + event.distance.x / zoom,
          y: data.y + event.distance.y / zoom,
        };
        return result;
      });
    }
  }
}

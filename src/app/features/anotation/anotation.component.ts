import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
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
  index = input<number>(-1);

  mode = input<AnotationMode | string>(AnotationMode.SAVED);

  data = input.required<IAnotation>();

  color = input.required<string>();

  isEdit = input<boolean>(false);

  editing = signal<boolean>(false);

  zoom = input<number>(1);

  create = output<IAnotation>();

  edit = output<IAnotation>();

  delete = output<IAnotation>();

  constructor() { }

  ngOnInit() {
    this.editing.set(this.mode() === AnotationMode.NEW);
  }

  onCreateHandler(data: Omit<IAnotation, 'x' | 'y'>) {
    const anotationData = {
      ...this.data(),
      ...data,
    };
    if (this.mode() === AnotationMode.NEW) {
      this.create.emit(anotationData);
    } else {
      this.editing.set(false);

      this.edit.emit(anotationData);
    }
  }

  onEditHandler() {
    this.editing.set(true);

    this.edit.emit(this.data());
  }

  onDeleteHandler() {
    this.delete.emit(this.data());
  }
}

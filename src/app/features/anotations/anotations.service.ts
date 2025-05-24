import { Injectable } from '@angular/core';
import { IAnotation } from '@entities/document-viewer/models';
import { Subject } from 'rxjs';
import { IPoint } from './models';

@Injectable({
  providedIn: 'root'
})
export class AnotationsService {
  private _queue = new Array<IAnotation>();

  private _add$ = new Subject<IPoint>();
  add$ = this._add$.asObservable();

  private _show$ = new Subject<Array<IAnotation>>();
  show$ = this._show$.asObservable();

  constructor() { }

  load(anotations: Array<IAnotation>) {
    this._queue.splice(0);
    this._queue.push(...anotations);

    this._show$.next(this._queue);
  }

  add(x: number, y: number) {
    this._add$.next({
      x,
      y,
    });
  }

  delete(index: number, anotation: IAnotation) {
    this._queue.splice(index, 1);

    this._show$.next(this._queue);
  }

  edit(index: number, anotation: IAnotation) {
    this._queue.splice(index, 1);
    this._queue.splice(index, 0, anotation);

    this._show$.next(this._queue);
  }

  create(anotation: IAnotation) {
    this._queue.push(anotation);

    this._show$.next(this._queue);
  }
}

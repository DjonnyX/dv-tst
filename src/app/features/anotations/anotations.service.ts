import { Injectable } from '@angular/core';
import { IAnotation } from '@entities/document-viewer/models';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { IPoint } from './models';
import { HttpClient } from '@angular/common/http';
import { byteArray2Base64 } from '@shared/utils';

const BASE64_IMG_PREFIX = "data:image/png;base64";

@Injectable({
  providedIn: 'root'
})
export class AnotationsService {
  private _queue = new Array<IAnotation>();

  private _add$ = new Subject<IPoint>();
  add$ = this._add$.asObservable();

  private _edit$ = new Subject<{ index: number, anotation: IAnotation }>();
  edit$ = this._edit$.asObservable();

  private _show$ = new Subject<Array<IAnotation>>();
  show$ = this._show$.asObservable();

  constructor(private _http: HttpClient) { }

  protected getImageAsBase64(imageUrl: string): Observable<string> {
    return this._http.get(imageUrl, { responseType: 'arraybuffer' }).pipe(
      switchMap(v => {
        const byteArray = new Uint16Array(v);
        return byteArray2Base64(byteArray);
      }),
      map(v => {
        return `${BASE64_IMG_PREFIX},${v}`;
      })
    );
  }

  load(anotations: Array<IAnotation>) {
    this._queue.splice(0);
    this._queue.push(...anotations);

    this._show$.next(this._queue);
  }

  clear() {
    this._queue.splice(0);

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
    if (index === -1) {
      this.create(anotation);

      const i = this._queue.length - 1, a = this._queue[this._queue.length - 1];

      setTimeout(() => {
        this._edit$.next({ index: i, anotation: a });
      });
    } else {
      this._queue.splice(index, 1);
      this._queue.splice(index, 0, anotation);

      this._show$.next(this._queue);
    }
  }

  create(anotation: IAnotation) {
    this._queue.push(anotation);

    this._show$.next(this._queue);
  }

  toArray() {
    return [...this._queue];
  }
}

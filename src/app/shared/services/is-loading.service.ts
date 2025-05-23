import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {

  private _check() {
    return this._entitiesOfLoading > 0;
  }

  protected _entitiesOfLoading: number = 0;
  get entitiesOfLoading() { return this._entitiesOfLoading; }
  set entitiesOfLoading(v: number) {
    if (v === this._entitiesOfLoading) {
      return;
    }

    this._entitiesOfLoading = v;
    this._isLoading$.next(this._check());
  }

  protected _isLoading$ = new BehaviorSubject(this._check());

  constructor() { }

  isLoading$() {
    return this._isLoading$.asObservable();
  }

  add() {
    this.entitiesOfLoading++;
  }

  remove() {
    this.entitiesOfLoading--;
  }
}

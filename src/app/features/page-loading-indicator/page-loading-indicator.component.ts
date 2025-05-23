import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { IsLoadingService } from '../../shared/services/is-loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dv-page-loading-indicator',
  standalone: false,
  templateUrl: './page-loading-indicator.component.html',
  styleUrl: './page-loading-indicator.component.scss'
})
export class PageLoadingIndicatorComponent {
  isLoading$: Observable<boolean>;

  constructor(
    private _isLoadingService: IsLoadingService,
    private _router: Router,
  ) {
    this.isLoading$ = this._isLoadingService.isLoading$();

    this._router.events
      .pipe(
        takeUntilDestroyed(),
        filter(
          event =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this._isLoadingService.add();
          return;
        } else {
          this._isLoadingService.remove();
        }
      });
  }
}

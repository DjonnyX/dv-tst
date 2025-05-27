import { Component, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { IsLoadingService } from '../../shared/services/is-loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dv-page-loading-indicator',
  standalone: false,
  templateUrl: './page-loading-indicator.component.html',
  styleUrl: './page-loading-indicator.component.scss'
})
export class PageLoadingIndicatorComponent {
  isLoading = signal<boolean>(false);

  private _isLoadingService = inject(IsLoadingService);

  private _router = inject(Router);

  constructor() {
    this._isLoadingService.isLoading$().pipe(
      tap(v => {
        this.isLoading.set(v);
      }),
    );

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

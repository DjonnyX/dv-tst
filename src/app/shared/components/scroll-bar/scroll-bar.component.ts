import { CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, input, OnDestroy, output } from '@angular/core';
import { ScrollBarDirection } from './enums';

@Component({
  selector: 'dv-scroll-bar',
  standalone: false,
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBarComponent implements AfterViewInit, OnDestroy {
  size = input<number>(0);

  enabled = input<boolean>(false);

  direction = input<ScrollBarDirection | string>(ScrollBarDirection.HORIZONTAL)

  scrollSize = input<number>(0);

  scroll = output<number>();

  private _resizeHandler = () => {
    this.resize();
  }

  constructor(private _cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this._resizeHandler);

    this.resize();
  }

  resize(): void {
    this._cdr.markForCheck();
  }

  onMoveHandler(event: CdkDragMove) {
    this.scroll.emit((this.direction() === 'horizontal' ? event.distance.x : event.distance.y) / (this.size() - this.scrollSize() * this.size()));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this._resizeHandler);
  }
}

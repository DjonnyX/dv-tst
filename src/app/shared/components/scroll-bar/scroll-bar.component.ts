import { CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ScrollBarDirection } from './enums';

@Component({
  selector: 'dv-scroll-bar',
  standalone: false,
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBarComponent implements AfterViewInit, OnDestroy {
  @Input()
  size: number = 0;

  @Input()
  enabled: boolean = false;

  @Input()
  direction: ScrollBarDirection | string = ScrollBarDirection.HORIZONTAL;

  private _scrollSize: number = 0;
  @Input()
  set scrollSize(v: number) {
    if (this._scrollSize === v) {
      return;
    }
    this._scrollSize = v;

    this.resize();
  }
  get scrollSize() {
    return this._scrollSize;
  }

  @Output()
  scroll = new EventEmitter<number>();

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
    this.scroll.emit((this.direction === 'horizontal' ? event.distance.x : event.distance.y) / (this.size - this._scrollSize * this.size));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this._resizeHandler);
  }
}

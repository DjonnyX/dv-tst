import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMetriks } from './models/metriks.model';

const ZOOM_STEP = .1,
  MIN_ZOOM = 0.011,
  MAX_ZOOM = 4.9;

@Component({
  selector: 'dv-image-viewer',
  standalone: false,
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ImageViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  @ViewChild('host')
  host: ElementRef<HTMLDivElement> | undefined;

  private _bounds$ = new BehaviorSubject<{ width: number, height: number }>({ width: 0, height: 0 });
  bounds$ = this._bounds$.asObservable();

  context2D: CanvasRenderingContext2D | null | undefined;

  private _metriks$ = new BehaviorSubject<IMetriks | null>(null);
  metriks$ = this._metriks$.asObservable();

  private _image: HTMLImageElement | undefined;

  private _posX: number = .5;

  private _posY: number = .5;

  private _ratio: number = 1;

  private _scale: number = 1;
  get zoom() { return `${Math.round(this._scale * 100)}%`; }

  private _data: string | null | undefined;
  @Input()
  set data(v: string | null | undefined) {
    if (this._data === v) {
      return;
    }

    this._data = v;
    this._load();
  }
  get data() { return this._data }

  private _onLoadHandler = () => {
    this._resize();
  }

  private _draw() {
    this.context2D = this.canvas?.nativeElement?.getContext('2d');
    if (this.context2D && this._image) {
      const w = this.host?.nativeElement.offsetWidth ?? 0, h = this.host?.nativeElement.offsetHeight ?? 0, wr = w * this._ratio, hr = h * this._ratio;
      const px = ((.5 - this._posX) * wr) + (wr - this._image.width) * .5, py =  ((.5 - this._posY) * hr) + (hr - this._image.height) * .5;
      this.context2D.drawImage(this._image, px, py);

      if (this.canvas && this.host) {
        const sx = (this._image.width - wr), sy = (this._image.height - hr), m = {
          left: this.host.nativeElement.offsetTop,
          top: this.host.nativeElement.offsetLeft,
          width: this.host.nativeElement.offsetWidth,
          height: this.host.nativeElement.offsetHeight,
          scrollX: px,
          scrollY: px,
          scrollWidth: 1 - sx / wr,
          scrollHeight: 1 - sy / hr,
          enabledScrollX: sx > 0,
          enabledScrollY: sy > 0,
        };
        this._metriks$.next(m);
      }
    }
  }

  private _resizeHandler = () => {
    this._resize();
  }

  private _resize() {
    if (this.canvas && this._image) {
      const w = this.host?.nativeElement.offsetWidth ?? 0, h = this.host?.nativeElement.offsetHeight ?? 0;
      const ratioX = this._image.width / w / this._scale, ratioY = this._image.height / h / this._scale;
      this._ratio = ratioX > ratioY ? ratioX : ratioY;
      this.canvas.nativeElement.width = w * this._ratio;
      this.canvas.nativeElement.height = h * this._ratio;

      this._bounds$.next({ width: w, height: h });

      this._draw();
    }
  }

  ngAfterViewInit(): void {
    this._load();

    window.addEventListener('resize', this._resizeHandler);

    this._resize();
  }

  onZoomOutHandler() {
    if (this._scale > MIN_ZOOM) {
      this._scale -= ZOOM_STEP;

      this._resize();
    }
  }

  onZoomInHandler() {
    if (this._scale < MAX_ZOOM) {
      this._scale += ZOOM_STEP;

      this._resize();
    }
  }

  onScrollBarHScrollHandler(position: number) {
    this._posX = position;

    this._resize();
  }

  onScrollBarVScrollHandler(position: number) {
    this._posY = position;

    this._resize();
  }

  protected _load() {
    if (this._data) {
      this._image = new Image();
      this._image.addEventListener('load', this._onLoadHandler);
      this._image.src = `data:image/png;base64,${this._data}`;
    }
  }

  ngOnDestroy(): void {
    if (this._image) {
      this._image.removeEventListener('load', this._onLoadHandler);
    }
    window.removeEventListener('resize', this._resizeHandler);
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, OnDestroy, signal, ViewChild } from '@angular/core';
import { IMetriks } from './models/metriks.model';
import { ScrollBarComponent } from '@shared/components/scroll-bar/scroll-bar.component';
import { AnotationsService } from '@features/anotations/anotations.service';
import { IRectangle } from '@features/anotations/models';

const ZOOM_STEP = .1,
  MIN_ZOOM = 0.02,
  MAX_ZOOM = 2.0,
  BASE64_IMG_PREFIX = "data:image/png;base64";

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

  @ViewChild('overlay')
  overlay: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('host')
  host: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('scrollbarX', { read: ScrollBarComponent, static: true })
  scrollbarX: ElementRef<ScrollBarComponent> | undefined;

  @ViewChild('scrollbarY', { read: ScrollBarComponent, static: true })
  scrollbarY: ElementRef<ScrollBarComponent> | undefined;

  bounds = signal<{ width: number, height: number }>({ width: 0, height: 0 });

  context2D: CanvasRenderingContext2D | null | undefined;

  metriks = signal<IMetriks | null>(null);

  contentBounds: IRectangle | undefined;

  private _image: HTMLImageElement | undefined;

  private _posX: number = .5;

  private _posY: number = .5;

  private _scale: number = 1;
  get scale() { return this._scale }
  get zoom() { return `${Math.round(this._scale * 100)}%`; }

  data = input<string | null | undefined>(undefined);

  private _onLoadHandler = () => {
    this._resize();
  }

  private _resizeHandler = () => {
    this._resize();
  }

  private _anotationsService = inject(AnotationsService);

  constructor() {
    effect(() => {
      const m = this.metriks();

      if (!m) {
        return;
      }

      const { scrollX, scrollY, contentWidth, contentHeight } = m;
      this.contentBounds = {
        x: scrollX,
        y: scrollY,
        width: contentWidth,
        height: contentHeight,
      };
    });

    effect(() => {
      const d = this.data();
      this._load(d);
    });
  }

  ngAfterViewInit(): void {
    this._load();

    window.addEventListener('resize', this._resizeHandler);

    this._resize();
  }

  onClickToCanvasHandler(event: MouseEvent) {
    if (this.host && this._image) {
      const w = this.host.nativeElement.offsetWidth ?? 0, h = this.host.nativeElement.offsetHeight ?? 0,
        scrollWidthLength = (w - this._image.width * this._scale),
        scrollHeightLength = (h - this._image.height * this._scale),
        px = (event.layerX - scrollWidthLength * this._posX) / this._scale,
        py = (event.layerY - scrollHeightLength * this._posY) / this._scale;

      this._createAnotation(px, py);
    }
  }

  onZoomOutHandler() {
    if (this._scale > MIN_ZOOM) {
      this._scale -= ZOOM_STEP;
      this._posY = .5;

      this._resize(false);
    }
  }

  onZoomInHandler() {
    if (this._scale < MAX_ZOOM) {
      this._scale += ZOOM_STEP;
      this._posY = .5;

      this._resize(false);

    }
  }

  onScrollBarHScrollHandler(position: number) {
    this._posX = position;

    this._resize(false);
  }

  onScrollBarVScrollHandler(position: number) {
    this._posY = position;

    this._resize(false);
  }

  protected _draw() {
    this.context2D = this.canvas?.nativeElement?.getContext('2d');
    if (this.host && this.context2D && this._image) {
      const w = this.host?.nativeElement.offsetWidth ?? 0, h = this.host?.nativeElement.offsetHeight ?? 0,
        sx = (this._image.width * this._scale - w), sy = (this._image.height * this._scale - h),
        scrollWidth = 1 - sx / w, scrollHeight = 1 - sy / h, scrollWidthLength = (w - this._image.width * this._scale),
        scrollHeightLength = (h - this._image.height * this._scale),
        px = scrollWidthLength * this._posX,
        py = scrollHeightLength * this._posY,
        imgWidth = this._image.width * this._scale,
        imgHeight = this._image.height * this._scale;
      this.context2D.clearRect(0, 0, this.canvas?.nativeElement?.width || 0, this.canvas?.nativeElement?.height || 0);
      this.context2D.drawImage(this._image, px, py, imgWidth, imgHeight);

      if (this.overlay) {
        this.overlay.nativeElement.style.left = `${px}px`;
        this.overlay.nativeElement.style.top = `${py}px`;
        this.overlay.nativeElement.style.width = `${imgWidth}px`;
        this.overlay.nativeElement.style.height = `${imgHeight}px`;
      }

      if (this.canvas && this.host) {
        const m = {
          left: this.host.nativeElement.offsetTop,
          top: this.host.nativeElement.offsetLeft,
          width: this.host.nativeElement.offsetWidth,
          height: this.host.nativeElement.offsetHeight,
          contentWidth: imgWidth,
          contentHeight: imgHeight,
          scrollX: px,
          scrollY: px,
          scrollWidth,
          scrollHeight,
          enabledScrollX: sx > 0,
          enabledScrollY: sy > 0,
        };
        this.metriks.set(m);
      }
    }
  }

  protected _resize(emit = true) {
    if (this.host && this.canvas && this._image) {
      const w = this.host.nativeElement.offsetWidth ?? 0, h = this.host.nativeElement.offsetHeight ?? 0;
      this.canvas.nativeElement.width = w;
      this.canvas.nativeElement.height = h;
      if (emit) {
        this.bounds.set({ width: w, height: h });
      }
      this._draw();
    }
  }

  protected _createAnotation(x: number, y: number) {
    this._anotationsService.add(x, y);
  }

  protected _load(data?: string | null | undefined) {
    const d = data || this.data();
    if (d) {
      this._image = new Image();
      this._image.addEventListener('load', this._onLoadHandler);
      this._image.src = `${BASE64_IMG_PREFIX},${d}`;
    }
  }

  ngOnDestroy(): void {
    if (this._image) {
      this._image.removeEventListener('load', this._onLoadHandler);
    }
    window.removeEventListener('resize', this._resizeHandler);
  }
}

import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IMetrix } from './models/metrix.model';

@Component({
  selector: 'dv-scroll-area',
  standalone: false,
  templateUrl: './scroll-area.component.html',
  styleUrl: './scroll-area.component.scss'
})
export class ScrollAreaComponent implements AfterViewInit {
  @ViewChild('overlay')
  overlay: ElementRef<HTMLDivElement> | undefined;

  private _metrix: IMetrix | null | undefined;
  @Input()
  set metrix(v: IMetrix | null | undefined) {
    if (this._metrix === v) {
      return;
    }

    this._metrix = v;

    this._resize();
  }

  contentWidth: number = 0;

  contentHeight: number = 0;

  boundingWidth: number = window.innerWidth;

  boundingHeight: number = window.innerHeight;

  ngAfterViewInit(): void {
    // this.overlay?.nativeElement = contentWidth;
  }

  private _resize() {
    this.contentWidth = this._metrix?.contentWidth ?? 0;
    this.contentHeight = this._metrix?.contentWidth ?? 0;
    this.boundingWidth = this._metrix?.width ?? 0;
    this.boundingHeight = this._metrix?.height ?? 0;
  }
}

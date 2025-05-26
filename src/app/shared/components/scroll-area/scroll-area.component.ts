import { AfterViewInit, Component, effect, ElementRef, input, Input, ViewChild } from '@angular/core';
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

  metrix = input<IMetrix | null | undefined>();

  contentWidth: number = 0;

  contentHeight: number = 0;

  boundingWidth: number = window.innerWidth;

  boundingHeight: number = window.innerHeight;

  constructor() {
    effect(() => {
      const m = this.metrix();
      this._resize(m);
    })
  }

  ngAfterViewInit(): void {
    // this.overlay?.nativeElement = contentWidth;
  }

  private _resize(metrix: IMetrix | null | undefined) {
    if (!metrix) {
      return;
    }

    this.contentWidth = metrix.contentWidth ?? 0;
    this.contentHeight = metrix.contentWidth ?? 0;
    this.boundingWidth = metrix.width ?? 0;
    this.boundingHeight = metrix.height ?? 0;
  }
}

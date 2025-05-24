import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITab, ITabSelect } from './models';

@Component({
  selector: 'dv-tabbar',
  standalone: false,
  templateUrl: './tabbar.component.html',
  styleUrl: './tabbar.component.scss'
})
export class TabbarComponent {
  @Input()
  items: Array<ITab> | null | undefined;

  @Input()
  selectedIndex: number = 0;

  @Output()
  select = new EventEmitter<ITabSelect>();

  onSelectHandler(e: MouseEvent, index: number, item: ITab) {
    e.stopImmediatePropagation();

    this.selectedIndex = index;
    this.select.emit({ index, item });
  }
}

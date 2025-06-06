import { Component, computed, effect, input, output, Signal, signal } from '@angular/core';
import { ITab, ITabSelect } from './models';

const DEFAULT_SELECTED_INDEX = 0;

@Component({
  selector: 'dv-tabbar',
  standalone: false,
  templateUrl: './tabbar.component.html',
  styleUrl: './tabbar.component.scss'
})
export class TabbarComponent {
  items = input.required<Array<ITab> | null>();

  list: Signal<Array<ITab & { index: number; }> | null>;

  selectedIndex = input<number>(DEFAULT_SELECTED_INDEX);

  selected = signal<number>(DEFAULT_SELECTED_INDEX);

  select = output<ITabSelect>();

  constructor() {
    effect(() => this.selected.set(this.selectedIndex()));

    this.list = computed(() => {
      const items = this.items();
      return items?.map((v, index) => ({ index, ...v })) || [];
    });
  }

  onSelectHandler(e: MouseEvent, index: number, item: ITab) {
    e.stopImmediatePropagation();

    this.selected.set(index);
    this.select.emit({ index, item });
  }
}

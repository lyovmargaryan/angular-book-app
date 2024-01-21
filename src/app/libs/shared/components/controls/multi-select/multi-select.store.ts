import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';

import { IMultiSelectItem } from './types';

export interface MultiSelectState {
  readyForRender: boolean;
  data: IMultiSelectItem[];
  selectedDataItems: IMultiSelectItem['value'][];

  disabled: boolean;
  placeholder: string;
  autocompletePanelOpened: boolean;
}

export const initialState: MultiSelectState = {
  readyForRender: false,
  data: [],
  selectedDataItems: [],

  disabled: false,
  placeholder: '',
  autocompletePanelOpened: true
};

@Injectable()
export class MultiSelectStore extends ComponentStore<MultiSelectState> {
  constructor() {
    super(initialState);
    // this.state$.subscribe(console.log);
  }

  readonly readyForRender$ = this.select((state) => state.readyForRender);
  readonly data$ = this.select((state) => state.data);
  readonly dataMap$ = this.select((state) =>
    state.data.reduce((map, obj) => {
      map[obj.value] = obj.name;
      return map;
    }, {})
  );
  readonly selectedDataItems$ = this.select((state) => state.selectedDataItems);
  readonly disabled$ = this.select((state) => state.disabled);
  readonly placeholder$ = this.select((state) => state.placeholder);
  readonly autocompletePanelOpened$ = this.select(
    (state) => state.autocompletePanelOpened
  );
}

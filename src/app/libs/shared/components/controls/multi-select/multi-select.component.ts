import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  ElementRef,
  TrackByFunction,
  ViewChild,
  AfterViewInit,
  Injector,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  FormControlDirective,
  FormControl
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule, MatChipGrid } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {
  combineLatest,
  map,
  Observable,
  skip,
  startWith,
  Subscription
} from 'rxjs';

import { IMultiSelectItem } from './types';
import { MultiSelectStore } from './multi-select.store';

const imports: Component['imports'] = [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatIconModule
];

const providers: Component['providers'] = [
  MultiSelectStore,
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
  }
];

@Component({
  standalone: true,
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers,
  imports: [imports]
})
export class MultiSelectComponent<T>
  implements OnInit, AfterViewInit, ControlValueAccessor, OnDestroy
{
  @ViewChild('chipListElem') chipListElem: MatChipGrid;
  @Input()
  set placeholder(placeholder: string) {
    this.store.patchState({ placeholder });
  }

  @Input()
  set data(data: Array<IMultiSelectItem> | null) {
    this.store.patchState({ data: data || [] });
  }

  @Input()
  set value(value: Array<IMultiSelectItem['value']> | null) {
    this.store.patchState({ selectedDataItems: value || [] });
  }

  @Input()
  set disabled(disabled: boolean) {
    this.store.patchState({ disabled });
  }

  private _dataItemMapperFn!: (item: T) => IMultiSelectItem;
  @Input()
  set dataItemMapperFn(dataItemMapperFn: (item: T) => IMultiSelectItem) {
    if (dataItemMapperFn) {
      this._dataItemMapperFn = dataItemMapperFn;
    }
  }
  get dataItemMapperFn() {
    return this._dataItemMapperFn;
  }

  @Input() maxHeightPx: number;
  @Input() minHeightPx: number;
  @Input() isDisableSubscriptWrapper: boolean;

  @Output()
  valueChanged = new EventEmitter<IMultiSelectItem['value'][]>();

  @ViewChild('inputElement')
  inputElement!: ElementRef<HTMLInputElement>;

  inputControl: UntypedFormControl = new UntypedFormControl(null);
  disabled$ = this.store.disabled$;
  data$ = this.store.data$;
  dataMap$ = this.store.dataMap$;
  selectedDataItems$ = this.store.selectedDataItems$;
  placeholder$ = this.store.placeholder$;
  originalControl: FormControl;
  filteredData$!: Observable<IMultiSelectItem[]>;
  sub = new Subscription();

  filteredDataTrackByFn: TrackByFunction<IMultiSelectItem> = (index, item) =>
    item.value;

  selectedDataItemsTrackByFn: TrackByFunction<IMultiSelectItem['value']> = (
    index,
    item
  ) => item;

  private _onChangeFn: (value: IMultiSelectItem['value']) => void = () => {};

  private _onTouchedFn: () => void = () => {};

  constructor(
    private store: MultiSelectStore,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const inputControlValueStream$: Observable<string | null> =
      this.inputControl.valueChanges.pipe(startWith(null));

    this.filteredData$ = combineLatest([
      inputControlValueStream$,
      this.selectedDataItems$,
      this.data$
    ]).pipe(
      map(([searchTerm, selectedDataItems, data]) =>
        filterAutocompleteData(searchTerm, data, selectedDataItems)
      )
    );

    this.sub.add(
      this.disabled$.subscribe((disabled) => {
        disabled ? this.inputControl.disable() : this.inputControl.enable();
      })
    );

    this.sub.add(
      this.selectedDataItems$.pipe(skip(1)).subscribe((selectedDataItems) => {
        this.valueChanged.emit(selectedDataItems);
        this._onChangeFn(selectedDataItems);
      })
    );
  }

  ngAfterViewInit() {
    const formData = this.injector.get(NgControl) as FormControlDirective;
    this.originalControl = formData?.form ?? formData?.control;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onRemove(dataItemValue: IMultiSelectItem['value']): void {
    this.originalControl?.markAsTouched();
    this.store.patchState((state) => ({
      selectedDataItems: state.selectedDataItems.filter(
        (item) => item !== dataItemValue
      )
    }));
    this.changeDetectorRef.detectChanges();
  }

  onSelected(event: MatAutocompleteSelectedEvent): void {
    this.originalControl?.markAsTouched();
    this.store.patchState((state) => ({
      // selectedDataItems: [
      //   ...state.selectedDataItems,
      //   state.data.find((o) => o.value === event.option.value).name
      // ]
      selectedDataItems: [...state.selectedDataItems, event.option.value]
    }));

    this.inputElement.nativeElement.value = '';

    this.inputControl.setValue(null);
    this.changeDetectorRef.detectChanges();
  }

  onInputKeyupEnter() {}

  onAutocompletePanelOpened() {
    this.store.patchState({ autocompletePanelOpened: true });
  }

  onAutocompletePanelClosed() {
    this.store.patchState({ autocompletePanelOpened: false });
    this.originalControl?.markAsTouched();
  }

  // Implemented by ControlValueAccessor
  registerOnChange(fn: (value: IMultiSelectItem['value']) => void): void {
    this._onChangeFn = fn;
  }

  // Implemented by ControlValueAccessor
  registerOnTouched(fn: () => void): void {
    this._onTouchedFn = fn;
  }

  // Implemented by ControlValueAccessor
  setDisabledState(isDisabled: boolean): void {
    this.store.patchState({ disabled: isDisabled });
  }

  // Implemented by ControlValueAccessor
  writeValue(value: IMultiSelectItem['value']): void {
    this.store.patchState({ selectedDataItems: value || [] });
  }
}

function filterAutocompleteData(
  searchTerm: string | null,
  data: IMultiSelectItem[],
  selectedDataItems: IMultiSelectItem['value'][]
) {
  if (searchTerm) {
    return data.filter(
      (item) =>
        !selectedDataItems.some((_item) => _item === item.value) &&
        item.name
          .toLowerCase()
          .includes(searchTerm.toString().toLowerCase().trim())
    );
  }

  return data.filter(
    (item) => !selectedDataItems.some((_item) => _item === item.value)
  );
}

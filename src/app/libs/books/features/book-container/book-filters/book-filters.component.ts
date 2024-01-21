import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IBookFeatureFiltersState} from "@app/libs/books/features/state/models/book-future.model";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MultiSelectComponent} from "@app/libs/shared/components/controls/multi-select/multi-select.component";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {BookLanguage} from "@app/libs/books/features/data-access/models/book.model";

export type FilterSelect = {
  name: string;
  value: string;
};

@Component({
  selector: 'app-book-filters',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, ReactiveFormsModule, MultiSelectComponent],
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFiltersComponent implements OnInit, OnDestroy{
  @Input() filters: IBookFeatureFiltersState;

  @Input() authors: IAuthorModel[] = [];

  selectAuthors: FilterSelect[];
  selectLanguages: FilterSelect[];


  @Output() filtersChanged = new EventEmitter<IBookFeatureFiltersState>();

  form: FormGroup;

  private sub = new Subscription();

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null),
      author: new FormControl([]),
      language: new FormControl([]),
      genre: new FormControl(null),
      fromPages: new FormControl(null),
      toPages: new FormControl(null),
    })
    this.sub.add(
      this.form.valueChanges.subscribe((value) => {
        this.filtersChanged.emit(value);
      })
    );

    this.selectAuthors = this.authors.map((author) => ({
      name: author.name,
      value: author.name
    }));

    this.selectLanguages = Object.values(BookLanguage).map((language) => ({
      name: language,
      value: language
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}

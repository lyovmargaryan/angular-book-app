import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {ISortState, SortDirection} from "@app-ngrx-utils/base-model";
import {MatDialog} from "@angular/material/dialog";
import {MatSortModule, Sort} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input() books: IBookModel[];

  @Input() sort: ISortState;

  @Output() sortChange = new EventEmitter<ISortState>();

  trackByFn: TrackByFunction<IBookModel> = (index, item) => item.id;

  constructor(
    private dialog: MatDialog
  ) {}

  displayedColumns = [
    'id',
    'title',
    'author',
    'description',
    'pages',
    'language',
    'genre'
  ];

  onSortChange(event: Sort): void {
    this.sortChange.emit({
      sortBy: event.active,
      sortDirection:
        event.direction === ''
          ? null
          : event.direction === SortDirection.ASC
            ? SortDirection.ASC
            : SortDirection.DESC
    });
  }

}

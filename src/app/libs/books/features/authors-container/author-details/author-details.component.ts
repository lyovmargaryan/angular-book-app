import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {ISortState, SortDirection} from "@app-ngrx-utils/base-model";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {MatSortModule, Sort} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {UpdateAuthorComponent} from "@app/libs/books/features/authors-container/update-author/update-author.component";

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule, MatSortModule, MatTableModule, MatButtonModule],
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorDetailsComponent {
  @Input() authors: IAuthorModel[];

  @Input() sort: ISortState;

  @Output() sortChange = new EventEmitter<ISortState>();

  trackByFn: TrackByFunction<IAuthorModel> = (index, item) => item.id;

  displayedColumns = [
    'id',
    'name',
    'actions'
  ];

  constructor(private dialog: MatDialog) {
  }

  onOpenUpdateDialog(author: IAuthorModel): void {
    this.dialog.open(UpdateAuthorComponent, {
      data: author,
      maxWidth: '90vw',
      disableClose: true
    });
  }

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

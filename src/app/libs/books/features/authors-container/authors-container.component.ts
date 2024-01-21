import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CallState} from "@app/store/utils";
import {authorSelectors, authorActions} from "@app/libs/books/features/state";
import {IPaginatorState, ISortState} from "@app-ngrx-utils/base-model";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {IAuthorState} from "@app/libs/books/features/state/models/author-future.model";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";
import {CreateAuthorComponent} from "@app/libs/books/features/authors-container/create-author/create-author.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  AuthorDetailsComponent
} from "@app/libs/books/features/authors-container/author-details/author-details.component";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-authors-container',
  standalone: true,
  imports: [CommonModule, CreateAuthorComponent, MatProgressSpinnerModule, AuthorDetailsComponent, MatPaginatorModule],
  templateUrl: './authors-container.component.html',
  styleUrls: ['./authors-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsContainerComponent implements OnInit {
  callState = CallState;

  selectCallState$ = this.store.select<CallState>(
    authorSelectors.selectAuthorCallState
  );

  authors$ = this.store.select<IAuthorModel[]>(
    authorSelectors.selectAuthorAllEntities
  );

  paginatedAuthors$ = this.store.select<IAuthorModel[]>(
    authorSelectors.selectPaginatedAuthors
  );

  sort$ = this.store.select<ISortState>(
    authorSelectors.selectAuthorsSortState
  );

  paginator$ = this.store.select<IPaginatorState>(
    authorSelectors.selectAuthorsPaginatorState
  );

  constructor(
    private store: Store<IAuthorState>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(authorActions.loadAuthors());
  }

  onSortChange(event: ISortState): void {
    this.store.dispatch(
      authorActions.updateSorting({
        payload: {
          sortDirection: event.sortDirection,
          sortBy: event.sortBy
        }
      })
    );
  }

  onPaginate(paginatorOptions: PageEvent): void {
    this.store.dispatch(
      authorActions.updatePagination({
        pageIndex: paginatorOptions.pageIndex,
        pageSize: paginatorOptions.pageSize,
        previousPageIndex: paginatorOptions.previousPageIndex
      })
    );
  }

  onCreateAuthor(author: string): void {
    this.store.dispatch(
      authorActions.createAuthor({ payload: author })
    );
  }
}

import { EntityState } from '@ngrx/entity';
import {
  ICallState,
  ISortState,
  IPaginatorState
} from '@app-ngrx-utils/base-model';
import {BookLanguage, IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {bookFeatureKey} from "@app/libs/books/features/state/book.feature";
import {IBookStoreState} from "@app/store/reducers";

export type IBookEntityState = EntityState<IBookModel>;

export interface IBookFeatureFiltersState {
  title: string;
  author: string;
  language: BookLanguage;
  genre: string;
  fromPages: number
  toPages: number
}

export interface IBookFeatureState {
  entities: IBookEntityState;
  book: { book: IBookModel };
  paginator: IPaginatorState;
  sort: ISortState;
  filters: IBookFeatureFiltersState;
  callState: ICallState;
  bookCallState: ICallState;
}

export interface IBooksState extends IBookStoreState{
  [bookFeatureKey]: IBookFeatureState;
}

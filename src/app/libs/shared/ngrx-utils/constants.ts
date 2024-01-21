import { IPaginatorState } from '@app-ngrx-utils/base-model';

export const DEFAULT_INITIAL_PAGINATION_DATA: IPaginatorState = {
  pageIndex: 0,
  previousPageIndex: 0,
  pageSize: 50,
  pageOptions: [50, 100, 250]
};

export const DEFAULT_SMALL_TABLE_INITIAL_PAGINATION_DATA: IPaginatorState = {
  pageIndex: 0,
  previousPageIndex: 0,
  pageSize: 10,
  pageOptions: [10, 30, 50, 100]
};

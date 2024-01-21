import { CallState } from '@app/store/utils';

export interface IPaginatorState {
  pageIndex: number;
  pageSize: number;
  pageOptions: number[];
  previousPageIndex: number;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface ISortState {
  sortDirection: SortDirection | null;
  sortBy: string | null;
}

export interface IUpdatePaginationDefaultModel {
  pageIndex: number;
  pageSize: number;
  previousPageIndex?: number;
  pageOptions?: number[];
}

export interface ISortingDefaultModel {
  sortDirection: SortDirection | null;
  sortBy: string | null;
}

export interface ICallState {
  callState: CallState;
  error: Error | null
}

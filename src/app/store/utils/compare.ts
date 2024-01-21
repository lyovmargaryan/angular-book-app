import { SortDirection } from '@app-ngrx-utils/base-model';

export function compare(a: any, b: any, sortDirection: SortDirection): number {
  const direction =
    sortDirection === SortDirection.ASC
      ? -1
      : sortDirection === SortDirection.DESC
        ? 1
        : 0;

  if (!a || !b) {
    return (a ? -1 : 1) * direction;
  }

  switch (typeof a) {
    case 'string':
      return a.localeCompare(b) * direction;
    case 'number':
      return (b - a) * direction;
    default:
      if (a instanceof Date && b instanceof Date) {
        return (b.getTime() - a.getTime()) * direction;
      }
      return direction;
  }
}

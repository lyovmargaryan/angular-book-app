export function paginateData<T>(
  data: T[],
  pageIndex: number,
  pageSize: number
) {
  const startIndex = pageIndex * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
}

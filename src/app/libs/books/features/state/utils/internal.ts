import {IBookModel} from "@app/libs/books/features/data-access/models/book.model";
import {IBookFeatureFiltersState} from "@app/libs/books/features/state/models/book-future.model";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";

export function filterBooks(
  books: IBookModel[],
  filters: IBookFeatureFiltersState
) {
  return books.filter((book) => {
    let match = true;

    if (filters.author?.length) {
      match = filters.author.includes(book.author);
    }

    if (filters.language?.length) {
      match = filters.language.includes(book.language);
    }

    if (match && filters?.title) {
      match = book.title.toLowerCase().includes(filters.title.toLowerCase()) ||
        book.description.toLowerCase().includes(filters.title.toLowerCase());
    }

    if (match && filters?.genre) {
      match = book.genre.toLowerCase().includes(filters.genre.toLowerCase());
    }

    if (match && (filters?.fromPages || filters?.toPages)) {
      const from = filters?.fromPages || 0;
      const to = filters?.toPages || Infinity;
      match = book.pages >= from && book.pages <= to;
    }

    return match;
  });
}

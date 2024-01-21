import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookModel } from '../models/book.model';
import { Observable } from 'rxjs';
import {environment} from "@env/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBookModel[]> {
    return this.http.get<IBookModel[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<IBookModel> {
    return this.http.get<IBookModel>(`${this.apiUrl}/${id}`);
  }

  createBook(book: IBookModel): Observable<IBookModel> {
    return this.http.post<IBookModel>(this.apiUrl, book);
  }
}

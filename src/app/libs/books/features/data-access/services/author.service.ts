import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "@env/environment.dev";
import {IAuthorModel} from "@app/libs/books/features/data-access/models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = `${environment.apiUrl}/authors`;

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<IAuthorModel[]> {
    return this.http.get<IAuthorModel[]>(this.apiUrl);
  }

  createAuthor(author: string): Observable<IAuthorModel> {
    return this.http.post<IAuthorModel>(this.apiUrl, author);
  }

  updateAuthor(body: IAuthorModel): Observable<IAuthorModel> {
    return this.http.patch<IAuthorModel>(`${this.apiUrl}/${body.id}`, body);
  }
}

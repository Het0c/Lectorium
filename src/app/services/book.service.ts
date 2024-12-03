import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any[]> {
    // Si la consulta es un ISBN (números o puede incluir guiones), busca por ISBN
    const isIsbn = /^[0-9-]+$/.test(query);
    const searchQuery = isIsbn ? `isbn:${query}` : query;
    const url = `${this.apiUrl}?q=${searchQuery}`;
    return this.http.get<any>(url).pipe(
      map(response => response.items || [])
    );
  }
}
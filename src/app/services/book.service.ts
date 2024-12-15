// Servicio Api para recibir libros por isbn o por nombre

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryService {
  private apiUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) { }

  searchBooks(query: string): Observable<any[]> {
    const url = `${this.apiUrl}?q=${query}`;
    return this.http.get<any>(url).pipe(
      map(response => response.docs.map((doc: any) => ({
        title: doc.title,
        authors: doc.author_name,
        description: doc.first_sentence ? doc.first_sentence[0] : '',
        fullDescription: doc.first_sentence ? doc.first_sentence[0] : '',
        thumbnail: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : 'assets/default-thumbnail.jpg',
        isLoading: true
      })))
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api';  // Cambiar la URL base para usar el proxy

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<any> {  // Agregar este método
    return this.http.get(`${this.apiUrl}/user/${userId}`)
      .pipe(
        catchError(this.handleError)  // Agregar manejo de errores
      );
  }

  getFavoriteBooks(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/favorite-books`)
      .pipe(
        catchError(this.handleError)  // Agregar manejo de errores
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

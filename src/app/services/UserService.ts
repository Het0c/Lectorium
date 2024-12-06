import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = '/api';  // Cambiar la URL base para usar el proxy

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getFavoriteBooks(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/favorite-books`);
  }
}

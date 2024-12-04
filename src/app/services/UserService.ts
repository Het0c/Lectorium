import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://nodejs-serverless-function-express-jcjnmm41v.vercel.app'; 

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getFavoriteBooks(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/favorite-books`);
  }
}

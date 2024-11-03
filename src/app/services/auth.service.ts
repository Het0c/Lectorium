import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userCredentials');
  }

  setSession(email: string, password: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userCredentials', JSON.stringify({ email, password }));
  }

  getSession(): { email: string, password: string } | null {
    const creds = localStorage.getItem('userCredentials');
    return creds ? JSON.parse(creds) : null;
  }
}

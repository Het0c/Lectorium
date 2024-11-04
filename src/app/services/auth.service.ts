import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';
  public userEmail: string = ''; // Propiedad para almacenar el correo

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    this.userEmail = email; // Almacena el correo
    return this.http.post(`${this.apiUrl}/reset-password`, { email });
  }

  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-code`, { email, code });
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password`, { email, newPassword });
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

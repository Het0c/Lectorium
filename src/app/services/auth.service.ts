import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;  // Usar la URL del entorno

  constructor(private http: HttpClient) {}

  userEmail: string ="";  // Define la propiedad userEmail

  login(email: string, password: string): Observable<any> {
    this.userEmail = email;  // Asigna el valor a userEmail
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }




  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
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



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
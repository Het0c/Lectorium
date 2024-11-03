import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient, private alertController: AlertController) { }

  searchBooks(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${query}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private async handleError(error: HttpErrorResponse) {
    const alert = await this.alertController.create({
      header: 'Error de Conexión',
      message: 'No se pudo conectar con la API. Por favor, intenta de nuevo más tarde.',
      buttons: ['OK']
    });
    await alert.present();

    return throwError('Algo salió mal; por favor, intenta de nuevo más tarde.');
  }
}

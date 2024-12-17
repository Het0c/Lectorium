import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  scanResult: string = ''; // Resultado del escaneo
  searchResults: any[] = []; // Resultados de búsqueda de libros

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private http: HttpClient // Para solicitudes HTTP
  ) {}

  // Escanear código QR
  async scanQR() {
    try {
      const barcodeData = await this.barcodeScanner.scan();
      if (barcodeData.cancelled) {
        this.showAlert('Escaneo Cancelado', 'El escaneo fue cancelado.');
        return;
      }

      this.scanResult = barcodeData.text;

      // Verificar si es un ISBN válido
      if (this.isValidISBN(this.scanResult)) {
        this.searchBookByISBN(this.scanResult); // Buscar libros por ISBN
      } else {
        this.showAlert('Código Inválido', 'El código escaneado no es un ISBN válido.');
      }
    } catch (error) {
      this.showAlert('Error', 'Error al escanear el código QR.');
    }
  }

  // Validar si es un ISBN
  isValidISBN(isbn: string): boolean {
    return /^(?:\d{9}[\dXx]|\d{13})$/.test(isbn);
  }

  // Buscar libros en la Google Books API
  searchBookByISBN(isbn: string) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response?.items?.length > 0) {
          this.searchResults = response.items.map((item: any) => ({
            title: item.volumeInfo.title || 'Título no disponible',
            authors: item.volumeInfo.authors || ['Autor no disponible'],
            description: item.volumeInfo.description || 'Descripción no disponible',
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'assets/placeholder.png',
          }));
        } else {
          this.showAlert('Sin Resultados', 'No se encontraron libros para este ISBN.');
        }
      },
      (error) => {
        console.error('Error al buscar libros:', error);
        this.showAlert('Error', 'No se pudo obtener información del libro.');
      }
    );
  }

  // Mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

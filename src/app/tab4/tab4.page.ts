import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab4',  // Asegúrate de que coincida con el selector del Tab 4
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  scanResult: string = '';  // Inicializa scanResult para evitar errores

  constructor(private barcodeScanner: BarcodeScanner) {}

  async scanQR() {
    try {
      const data = await this.barcodeScanner.scan();
      this.scanResult = data.text; // Almacena el resultado del QR escaneado
      console.log("QR Code Data:", this.scanResult);
    } catch (error) {
      console.error("Error escaneando el QR:", error);
    }
  }
}

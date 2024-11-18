import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  scanResult: string='';

  constructor(private barcodeScanner: BarcodeScanner, private alertController: AlertController) {}

  async scanQR() {
    try {
      const barcodeData = await this.barcodeScanner.scan();
      if (barcodeData.cancelled) {
        this.showAlert('Escaneo Cancelado', 'El escaneo fue cancelado.');
        return;
      }
      this.scanResult = barcodeData.text;
      this.showAlert('Escaneo Exitoso', `Contenido del QR: ${this.scanResult}`);
    } catch (error) {
      this.showAlert('Error', 'Error al escanear el código QR.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

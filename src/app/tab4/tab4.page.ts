import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  scanResult: string = ''; 

  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {}

 
  ionViewWillEnter() {
    this.scanQR();  
  }

  async scanQR() {
    try {
      const data = await this.barcodeScanner.scan();
      this.scanResult = data.text; 
      console.log("QR Code Data:", this.scanResult);
    } catch (error) {
      console.error("Error escaneando el QR:", error);
    }
  }
}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private authService: AuthService, private alertController: AlertController) {}

  async onRegister() {
    if (this.credentials.username && this.credentials.password) {
      this.authService.register(this.credentials.username, this.credentials.password).subscribe(
        async response => {
          await this.showAlert('Registro exitoso', 'Tu cuenta ha sido creada correctamente.');
          this.navCtrl.navigateForward('/login');
        },
        async error => {
          await this.showAlert('Error de registro', 'No se pudo crear la cuenta. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      console.log('Todos los campos son requeridos');
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

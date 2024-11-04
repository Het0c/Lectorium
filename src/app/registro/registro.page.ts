import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registo',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  credentials = {
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };

  constructor(private navCtrl: NavController, private authService: AuthService, private alertController: AlertController) {}

  async onRegister() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (this.credentials.agreeToTerms) {
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
      await this.showAlert('Error', 'Debes aceptar los términos y condiciones.');
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

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}

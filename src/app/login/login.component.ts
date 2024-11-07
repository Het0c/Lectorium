import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async onLogin() {
    const { email, password } = this.credentials;

    this.authService.login(email, password).subscribe(
      async response => {
        this.authService.setSession(email, password);
        await this.showSuccessToast('Login exitoso. Has iniciado sesión correctamente.');
      },
      async error => {
        console.error('Error de Login', error); // Depuración
        await this.showErrorAlert('Error de Login', `No se pudo iniciar sesión. ${error.error.error || 'Por favor, verifica tus credenciales.'}`);
      }
    );
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  async showErrorAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
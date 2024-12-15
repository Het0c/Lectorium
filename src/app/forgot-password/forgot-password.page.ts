import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular'; // Importa LoadingController

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController // Añade LoadingController al constructor
  ) {}

  async onSubmit() {
    if (this.email) {
      const loading = await this.loadingController.create({
        message: 'Enviando correo...',
      });
      await loading.present();

      this.authService.sendResetPasswordEmail(this.email).subscribe(
        async () => {
          await loading.dismiss();
          await this.showAlert('Correo enviado', 'Revisa tu correo para restablecer tu contraseña.');
          this.navCtrl.navigateForward('/verify-code'); // Navega a verify-code después de enviar el correo
        },
        async error => {
          await loading.dismiss();
          console.error('Error al enviar el correo:', error); // Log del error
          await this.showAlert('Error', 'No se pudo enviar el correo. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      console.log('El campo de correo electrónico es requerido');
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

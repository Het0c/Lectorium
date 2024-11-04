import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage {
  code: string = '';

  constructor(private authService: AuthService, private alertController: AlertController, private navCtrl: NavController) {}

  async onSubmit() {
    const email = this.authService.userEmail; // Utiliza el correo almacenado
    if (this.code) {
      this.authService.verifyCode(email, this.code).subscribe(
        async () => {
          await this.showAlert('Código verificado', 'El código es correcto. Puedes cambiar tu contraseña.');
          this.navCtrl.navigateForward('/update-password'); // Navega a la página de actualización de contraseña
        },
        async error => {
          await this.showAlert('Error', 'Código inválido. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      console.log('El campo de código es requerido');
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

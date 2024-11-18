import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage {
  newPassword: string = '';

  constructor(
    private authService: AuthService, 
    private alertController: AlertController, 
    private navCtrl: NavController
  ) {}

  async onSubmit() {
    const email = this.authService.userEmail; // Utiliza el correo almacenado
    if (!this.newPassword || this.newPassword.length < 8) {
      await this.showAlert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    this.authService.updatePassword(email, this.newPassword).subscribe(
      async () => {
        await this.showAlert('Contraseña Actualizada', 'Tu contraseña ha sido actualizada correctamente.');
        this.navCtrl.navigateForward('/login'); // Navega a la página de inicio de sesión
      },
      async error => {
        await this.showAlert('Error', 'No se pudo actualizar la contraseña. Por favor, inténtalo de nuevo.');
      }
    );
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

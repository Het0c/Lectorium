import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private alertController: AlertController) { }

  async onLogin() {
    const { username, password } = this.credentials;

    this.authService.login(username, password).subscribe(
      async response => {
        this.authService.setSession(username, password);
        await this.showAlert('Login exitoso', 'Has iniciado sesión correctamente.');
      },
      async error => {
        await this.showAlert('Error de Login', 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.');
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

  goToRegister() {
    // Implementa la navegación al registro si es necesario
  }
}

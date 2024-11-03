import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Servicio de autenticación
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authService: AuthService, private alertController: AlertController) { }

  async login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      async response => {
        this.authService.setSession(email, password);
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
}

//mmh
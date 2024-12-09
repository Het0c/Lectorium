import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private navCtrl: NavController, 
    private authService: AuthService, 
    private alertCtrl: AlertController,
    private loadingController: LoadingController // Importar LoadingController
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    return loading;
  }

  async onLogin() {
    const loading = await this.presentLoading(); // Mostrar pantalla de carga

    this.authService.login(this.credentials.username, this.credentials.password).subscribe(
      async (user) => {
        await loading.dismiss(); // Ocultar pantalla de carga

        if (user) {
          // Guardar las credenciales en localStorage
          this.authService.setSession(this.credentials.username, this.credentials.password);
          this.navCtrl.navigateForward('/tabs', {
            queryParams: { username: this.credentials.username }
          });
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Credenciales incorrectas.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error) => {
        await loading.dismiss(); // Ocultar pantalla de carga
        console.error('Error de Login', error); // Depuración
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: `No se pudo iniciar sesión. ${error.error?.error || 'Por favor, verifica tus credenciales.'}`,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  goToRegistro() {
    this.navCtrl.navigateForward('/registro');
  }

  goToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }
}

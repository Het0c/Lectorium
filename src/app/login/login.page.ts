import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  constructor(private navCtrl: NavController, private authService: AuthService, private alertCtrl: AlertController) {}

  async onLogin() {
    this.authService.login(this.credentials.username, this.credentials.password).subscribe(
      async (user) => {
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
      }
    );
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }
}

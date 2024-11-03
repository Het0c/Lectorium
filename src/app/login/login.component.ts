import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.credentials.username, this.credentials.password)
      .then(response => {
        console.log('Inicio de sesión exitoso', response);
        // Redirecciona o muestra un mensaje de éxito
      })
      .catch(error => {
        console.error('Error en el inicio de sesión', error);
        // Muestra un mensaje de error
      });
  }

  goToRegister() {
    // Implementa la lógica para redirigir a la página de registro
  }
}

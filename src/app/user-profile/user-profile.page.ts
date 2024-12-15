import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: any;
  selectedFile: File | null = null;  // Inicializa como null

  constructor(private http: HttpClient, private authService: AuthService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    const userId = this.authService.getCurrentUser().id; // Obtén el ID del usuario desde el servicio de autenticación
    this.http.get(`https://server-lectorium.onrender.com/profile/${userId}`).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;  // Asegura que selectedFile no sea undefined
  }
onUpload() {
  if (!this.selectedFile) {
    console.error('No file selected');
    return;
  }
  
  const userId = this.authService.getCurrentUser().id;
  const fd = new FormData();
  fd.append('profilePicture', this.selectedFile, this.selectedFile.name);
  fd.append('userId', userId.toString());
  this.http.post(`https://server-lectorium.onrender.com/upload-profile-picture`, fd).subscribe(
    (res: any) => {
      this.user.profilePicture = res.profilePicture;
    },
    (error) => {
      console.error('Error al subir la imagen de perfil:', error);
    }
  );
}


  goBack() {
    this.navCtrl.back();
  }

  onLogout(): void {
    this.authService.logout();  // Limpia el almacenamiento local
    this.router.navigate(['/login']);  // Redirige al usuario a la pantalla de inicio de sesión
  }
}



//   user = {
//     name: 'Héctor López',
//     username: '@het0c',
//     bio: 'no se leer, esto es un Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
//     profilePicture: 'assets/icon/user_example',
//     booksRead: 20,
//     booksWishlist: 15,
//     reviews: 10,
//   };

//   favoriteBooks = [
//     { title: '1984', author: 'George Orwell', cover: 'assets/74616e2090e08508e87b37ed2e60df84.webp' },
//     { title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'assets/74616e2090e08508e87b37ed2e60df84.webp' },
//     { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/625428ec261ac384603ebab3_609ab57f2f76e83b56daaf5c_9788418395185_web.jpeg' },
//   ];




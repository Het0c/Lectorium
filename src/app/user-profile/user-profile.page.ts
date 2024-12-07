import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user = {
    name: 'Héctor López',
    username: '@het0c',
    bio: 'no se leer, esto es un Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    profilePicture: 'assets/icon/user_example',
    booksRead: 20,
    booksWishlist: 15,
    reviews: 10,
  };

  favoriteBooks = [
    { title: '1984', author: 'George Orwell', cover: 'assets/74616e2090e08508e87b37ed2e60df84.webp' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'assets/74616e2090e08508e87b37ed2e60df84.webp' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/625428ec261ac384603ebab3_609ab57f2f76e83b56daaf5c_9788418395185_web.jpeg' },
  ];

  constructor(private navCtrl: NavController, private authService: AuthService, private router: Router) {}

  goBack() {
    this.navCtrl.back();
  }

  onLogout(): void {
    this.authService.logout();  // Limpia el almacenamiento local
    this.router.navigate(['/login']);  // Redirige al usuario a la pantalla de inicio de sesión
  }
  


  ngOnInit() {}
}


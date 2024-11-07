import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user = {
    name: 'Juan Pérez',
    username: '@juanperez',
    bio: 'Avid reader and book lover. Passionate about literature and technology.',
    profilePicture: 'assets/images/profile.jpg',
    booksRead: 20,
    booksWishlist: 15,
    reviews: 10,
  };

  favoriteBooks = [
    { title: '1984', author: 'George Orwell', cover: 'assets/images/1984.jpg' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'assets/images/mockingbird.jpg' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'assets/images/gatsby.jpg' },
  ];

  constructor() {}

  ngOnInit() {}
}

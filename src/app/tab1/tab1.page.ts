import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../services/book.service';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  searchQuery: string = '';
  searchResults: any[] = [];

  personalizedBooks = [
    {
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      image: 'assets/images/7_habits.jpg'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'assets/images/lean_startup.jpg'
    },
  ];

  popularBooks = [
    {
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      image: 'assets/images/power_of_habit.jpg'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'assets/images/lean_startup.jpg'
    },
  ];

  constructor(private googleBooksService: GoogleBooksService, private navCtrl: NavController) {}

  ngOnInit() {}

  onSearchChange(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.googleBooksService.searchBooks(query).subscribe(books => {
        this.searchResults = books.map(book => ({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: this.shortenDescription(book.volumeInfo.description, 100),  // Truncar la descripción aquí
          fullDescription: book.volumeInfo.description,  // Mantener la descripción completa para la vista previa
          thumbnail: book.volumeInfo.imageLinks?.thumbnail
        }));
      });
    } else {
      this.searchResults = [];
    }
  }

  shortenDescription(description: string, maxLength: number): string {
    if (description && description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }

  viewBookPreview(book: any) {
    this.navCtrl.navigateForward('/book-preview', {
      queryParams: {
        book: JSON.stringify({
          title: book.title,
          authors: book.authors,
          description: book.fullDescription,  // Enviar la descripción completa
          thumbnail: book.thumbnail
        })
      }
    });
  }
}

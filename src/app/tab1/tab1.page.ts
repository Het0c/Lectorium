import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/book.service';
import { NavController } from '@ionic/angular';

import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

import { Book } from '../models/book.model'; // Importar la interfaz

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  searchQuery: string = '';
  searchResults: Book[] = [];

  personalizedBooks: Book[] = [
    {
      title: 'The 7 Habits of Highly Effective People',
      authors: ['Stephen Covey'],
      description: '',
      fullDescription: '',
      thumbnail: 'assets/7_habits.jpg',
      isLoading: true
    },
    {
      title: 'The Lean Startup',
      authors: ['Eric Ries'],
      description: '',
      fullDescription: '',
      thumbnail: 'assets/lean_startup.jpg',
      isLoading: true
    },
  ];

  popularBooks: Book[] = [
    {
      title: 'The Power of Habit',
      authors: ['Charles Duhigg'],
      description: '',
      fullDescription: '',
      thumbnail: 'https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/625428ec261ac384603ebab3_609ab57f2f76e83b56daaf5c_9788418395185_web.jpeg',
      isLoading: true
    },
    {
      title: 'The Lean Startup',
      authors: ['Eric Ries'],
      description: '',
      fullDescription: '',
      thumbnail: 'https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/625428ec261ac384603ebab3_609ab57f2f76e83b56daaf5c_9788418395185_web.jpeg',
      isLoading: true
    },
  ];

  constructor(
    private openLibraryService: OpenLibraryService, 
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('Initializing HomePage');

    if (Capacitor.isNativePlatform()) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        }
      });

      PushNotifications.addListener('registration', (token: Token) => {});

      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      });
    }
  }

  onSearchChange(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.openLibraryService.searchBooks(query).subscribe((books: any[]) => {
        this.searchResults = books.map((book: any) => ({
          title: book.title,
          authors: book.authors || [], // Asegúrate de que authors no sea undefined
          description: this.shortenDescription(book.description, 100),
          fullDescription: book.fullDescription,
          thumbnail: book.thumbnail,
          isLoading: true
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

  onImageLoad(book: Book) {
    book.isLoading = false;
  }
  
  onImageError(book: Book) {
    book.isLoading = false;
    book.thumbnail = 'assets/default-thumbnail.jpg'; // Ruta a una imagen por defecto
  }
  viewBookPreview(book: any) {
    this.navCtrl.navigateForward('/book-preview', {
      queryParams: {
        book: JSON.stringify({
          title: book.title,
          authors: book.authors,
          description: book.fullDescription,
          thumbnail: book.thumbnail
        })
      }
    });
  }
}
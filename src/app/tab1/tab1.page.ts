import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../services/book.service';
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
    private googleBooksService: GoogleBooksService, 
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.markAllImagesLoading()
    console.log('Initializing HomePage');

      if (Capacitor.isNativePlatform()) {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: Token) => {
        
      });
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      });
  
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      });
    }
  
  
  }

 // markAllImagesLoading() {
 //   this.personalizedBooks.forEach(book => book.isLoading = true);
//    this.popularBooks.forEach(book => //book.isLoading = true);
//  }


  

  onSearchChange(event: any) {
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.googleBooksService.searchBooks(query).subscribe((books: any[]) => {
        this.searchResults = books.map((book: any) => {
          let thumbnail = book.volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://');
          if (thumbnail) {
            thumbnail = thumbnail.replace('&zoom=1', '&zoom=3').replace('&zoom=1', '&zoom=1');
          }
          return {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: this.shortenDescription(book.volumeInfo.description, 100),
            fullDescription: book.volumeInfo.description,
            thumbnail: thumbnail,
            isLoading: true
          };
        });
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

 

import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../services/book.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

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
      image: 'assets/7_habits.jpg'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'assets/lean_startup.jpg'
    },
  ];

  popularBooks = [
    {
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      image: 'https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/625428ec261ac384603ebab3_609ab57f2f76e83b56daaf5c_9788418395185_web.jpeg'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'https://cdn.prod.website-files.com/6034d7d1f3e0f52c50b2adee/625428ec261ac384603ebab3_609ab57f2f76e83b56daaf5c_9788418395185_web.jpeg'
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

/*
@Component({
  selector: 'app-home',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


  
  export class HomePage implements OnInit {
    ngOnInit() {
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
        alert('Push registration success, token: ' + token.value);
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
  }

*/

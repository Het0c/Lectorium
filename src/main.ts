import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAftcwvphVKY8wkvPl9wEi-_A-ADnSKHOY",
  authDomain: "lectorium-9aa8d.firebaseapp.com",
  projectId: "lectorium-9aa8d",
  storageBucket: "lectorium-9aa8d.firebasestorage.app",
  messagingSenderId: "870212383354",
  appId: "1:870212383354:web:80c642ab4933d51dcf41c3",
  measurementId: "G-H312NGJ2Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);